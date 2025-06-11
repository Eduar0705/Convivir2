const logoUrl = "../img/LOGO.png";

// Function to get current date in DD/MM/YYYY format
function getFormattedDate() {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
}

// Function to generate clean table HTML
function getCleanTableHTML() {
    let table = document.querySelector('.payments-table');
    let clone = table.cloneNode(true);

    // Remove "Actions" column
    clone.querySelectorAll('thead tr').forEach(tr => tr.deleteCell(-1));
    clone.querySelectorAll('tbody tr').forEach(tr => tr.deleteCell(-1));

    // Apply inline styles for table
    clone.style.borderCollapse = "collapse";
    clone.style.width = "100%";
    clone.querySelectorAll('th, td').forEach(cell => {
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "10px";
        cell.style.textAlign = "center";
        cell.style.fontSize = "14px";
    });
    clone.querySelectorAll('th').forEach(th => {
        th.style.backgroundColor = "#f2f2f2";
        th.style.fontWeight = "bold";
    });
    return clone.outerHTML;
}

// Export to Excel
document.getElementById('export-excel').addEventListener('click', function () {
    let tableHTML = getCleanTableHTML();
    let html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                .logo-header { text-align:center; margin-bottom:20px; }
                .logo-header img { height:80px; width:auto; max-width:200px; }
                .title { text-align:center; font-size:20px; font-weight:bold; margin-bottom:10px; }
                .date { text-align:center; font-size:16px; margin-bottom:20px; }
                table { border-collapse:collapse; width:100%; margin:0 auto; }
                th, td { border:1px solid #ccc; padding:10px; text-align:center; font-size:14px; }
                th { background:#f2f2f2; font-weight:bold; }
            </style>
        </head>
        <body>
            <div class="logo-header">
                <img src="${logoUrl}" alt="Logo">
            </div>
            <div class="title">Historial de Pagos</div>
            <div class="date">Fecha de emisión: ${getFormattedDate()}</div>
            ${tableHTML}
        </body>
        </html>
    `;
    let blob = new Blob([html], {type: 'application/vnd.ms-excel'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Registro_de_pagos_${getFormattedDate().replace(/\//g, '-')}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Export to PDF
document.getElementById('export-pdf').addEventListener('click', function () {
    let tableHTML = getCleanTableHTML();
    let printContents = `
        <div class="logo-header" style="text-align:center; margin-bottom:20px;">
            <img src="${logoUrl}" alt="Logo" style="height:100px; width:auto; max-width:250px;">
        </div>
        <div class="title" style="text-align:center; font-size:24px; font-weight:bold; margin-bottom:10px;">
            Historial de Pagos
        </div>
        <div class="date" style="text-align:center; font-size:16px; margin-bottom:20px;">
            Fecha de emisión: ${getFormattedDate()}
        </div>
        ${tableHTML}
    `;
    let win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Pagos PDF</title>');
    win.document.write('<style>');
    win.document.write('table { border-collapse:collapse; width:100%; margin:0 auto; }');
    win.document.write('th, td { border:1px solid #ccc; padding:10px; text-align:center; font-size:14px; }');
    win.document.write('th { background:#f2f2f2; font-weight:bold; }');
    win.document.write('@media print { body { margin: 20mm; } }');
    win.document.write('</style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => win.print(), 500);
});

// Search and Clear Buttons
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const metodoSelect = document.getElementById('metodo-select');
    const desdeInput = document.getElementById('desde-input');
    const hastaInput = document.getElementById('hasta-input');
    const torreSelect = document.getElementById('edi');
    const filtrarBtn = document.getElementById('filtrar-btn');
    const limpiarBtn = document.getElementById('limpiar-btn');
    const table = document.querySelector('.payments-table tbody');

    // Set max date for hastaInput to today
    const today = new Date().toISOString().split('T')[0];
    hastaInput.setAttribute('max', today);

    function filtrarTabla() {
        const search = searchInput.value.trim().toLowerCase();
        const metodo = metodoSelect.value;
        const desde = desdeInput.value;
        const hasta = hastaInput.value;
        const torre = torreSelect.value;
        const currentDate = new Date();

        // Validate date range
        if (hasta && new Date(hasta) > currentDate) {
            alert('La fecha "Hasta" no puede ser mayor a la fecha actual');
            hastaInput.value = today;
            return;
        }

        // Debug: Log tower values to check what's being compared
        console.log('Selected torre:', torre);
        const torreValues = new Set();
        Array.from(table.rows).forEach(row => {
            if (row.cells.length >= 6) {
                const rowTorre = row.cells[4].textContent.trim();
                torreValues.add(rowTorre);
            }
        });
        console.log('Unique torre values in table:', Array.from(torreValues));

        Array.from(table.rows).forEach(row => {
            // Skip "No records" row
            if (row.cells.length < 6) return;

            const referencia = row.cells[0].textContent.toLowerCase();
            const monto = row.cells[1].textContent.toLowerCase();
            const cedula = row.cells[2].textContent.toLowerCase();
            const fecha = row.cells[3].textContent;
            const rowTorre = row.cells[4].textContent.trim();
            const metodoPago = row.cells[5].textContent;

            let matchesSearch = true;
            let matchesMetodo = true;
            let matchesFecha = true;
            let matchesTorre = true;

            // Numeric search (reference, ID, amount)
            if (search) {
                matchesSearch = referencia.includes(search) || cedula.includes(search) || monto.includes(search);
            }

            // Payment method filter
            if (metodo) {
                matchesMetodo = metodoPago === metodo;
            }

            // Date range filter
            if (desde || hasta) {
                const rowDate = new Date(fecha.split('/').reverse().join('-'));
                if (desde && rowDate < new Date(desde)) {
                    matchesFecha = false;
                }
                if (hasta && rowDate > new Date(hasta)) {
                    matchesFecha = false;
                }
            }

            // Tower filter (case-insensitive, trim whitespace)
            if (torre) {
                matchesTorre = rowTorre.toLowerCase() === torre.toLowerCase() || rowTorre.toLowerCase().includes(`torre ${torre.toLowerCase()}`);
            }

            // Show row only if all active filters match
            row.style.display = (matchesSearch && matchesMetodo && matchesFecha && matchesTorre) ? '' : 'none';
        });
    }

    filtrarBtn.addEventListener('click', filtrarTabla);

    limpiarBtn.addEventListener('click', function() {
        searchInput.value = '';
        metodoSelect.value = '';
        desdeInput.value = '';
        hastaInput.value = '';
        torreSelect.value = '';
        filtrarTabla();
    });
    document.getElementById('aceptar-precio').addEventListener('click', function() {
            const precio = document.getElementById('precio-dolar').value;
            document.getElementById('mostrar-precio').textContent = precio ? `Precio actual: ${precio} BS` : '';
        });
        document.getElementById('aceptar-precio').addEventListener('click', function() {
            const precio = parseFloat(document.getElementById('precio-dolar').value);
            const totalPagos = '<%= totalPagos %>';
            let totalUSD = 0;
            if (precio > 0) {
                totalUSD = (totalPagos / precio).toFixed(2);
            }
            document.getElementById('total-usd').textContent = totalUSD + ' $';
        });
        function eliminarPago(id_pago){
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/eliminarPago/' + id_pago;
                }
            });
        }
});