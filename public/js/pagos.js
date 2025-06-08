// Ruta del logo
const logoUrl = "../img/LOGO.png";

// Función para generar tabla HTML limpia 
function getCleanTableHTML() {
    let table = document.querySelector('.payments-table');
    let clone = table.cloneNode(true);

    // Eliminar la columna "Acciones"
    clone.querySelectorAll('thead tr').forEach(tr => tr.deleteCell(-1));
    clone.querySelectorAll('tbody tr').forEach(tr => tr.deleteCell(-1));

    // Agregar estilos inline para tabla
    clone.style.borderCollapse = "collapse";
    clone.style.width = "100%";
    clone.querySelectorAll('th, td').forEach(cell => {
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "8px";
        cell.style.textAlign = "center";
    });
    return clone.outerHTML;
}

// Exportar a Excel
document.getElementById('export-excel').addEventListener('click', function () {
    let tableHTML = getCleanTableHTML();
    let html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                .logo-header { text-align:center; margin-bottom:20px; }
                .logo-header img { height:60px; }
                .title { text-align:center; font-size:22px; font-weight:bold; margin-bottom:10px; }
                table { border-collapse:collapse; width:100%; }
                th, td { border:1px solid #ccc; padding:8px; text-align:center; }
                th { background:#f2f2f2; }
            </style>
        </head>
        <body>
            <div class="logo-header">
                <img src="${logoUrl}" alt="Logo">
            </div>
            <div class="title">Historial de Pagos</div>
            ${tableHTML}
        </body>
        </html>
    `;
    let blob = new Blob([html], {type: 'application/vnd.ms-excel'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Registro de pagos.xls';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Exportar a PDF
document.getElementById('export-pdf').addEventListener('click', function () {
    let tableHTML = getCleanTableHTML();
    let printContents = `
        <div class="logo-header" style="text-align:center; margin-bottom:20px;">
            <img src="${logoUrl}" alt="Logo" style="height:60px;">
        </div>
        <div class="title" style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:10px;">
            Historial de Pagos
        </div>
        ${tableHTML}
    `;
    let win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Pagos PDF</title>');
    win.document.write('<link rel="stylesheet" href="../css/pagos.css">');
    win.document.write('<style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:8px;text-align:center;}th{background:#f2f2f2;}</style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => win.print(), 500);
});
