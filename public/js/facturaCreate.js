// Seleccionar todos los botones con la clase 'generar_factura'
document.querySelectorAll('.generar_factura').forEach(button => {
    button.addEventListener('click', function() {
        // Cargar la biblioteca jsPDF desde CDN
        const { jsPDF } = window.jspdf;
        
        // Crear una nueva instancia de jsPDF
        const doc = new jsPDF();
        
        // Obtener los datos de la fila actual
        const row = this.closest('tr');
        const numReferencia = row.cells[0].textContent;
        const residente = row.cells[1].textContent;
        const cedula = row.cells[2].textContent;
        const fecha = row.cells[3].textContent;
        const monto = row.cells[4].textContent;
        const metodo = row.cells[5].textContent;
        const bancoEmisor = row.cells[6].textContent;
        const taza = row.cells[7].textContent;
        
        // Configurar el título de la factura
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text('Factura de Pago', 105, 20, { align: 'center' });
        
        // Línea divisoria
        doc.setLineWidth(0.5);
        doc.line(20, 30, 190, 30);
        
        // Configurar la fuente para el contenido
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        // Agregar los datos de la factura de forma ordenada
        let y = 40;
        const lineHeight = 10;
        const leftMargin = 20;
        
        doc.text('Número de Referencia:', leftMargin, y);
        doc.text(numReferencia, 70, y);
        y += lineHeight;
        
        doc.text('Residente:', leftMargin, y);
        doc.text(residente, 70, y);
        y += lineHeight;
        
        doc.text('Cédula:', leftMargin, y);
        doc.text(cedula, 70, y);
        y += lineHeight;
        
        doc.text('Fecha:', leftMargin, y);
        doc.text(fecha, 70, y);
        y += lineHeight;
        
        doc.text('Monto:', leftMargin, y);
        doc.text(monto, 70, y);
        y += lineHeight;
        
        doc.text('Método:', leftMargin, y);
        doc.text(metodo, 70, y);
        y += lineHeight;
        
        doc.text('Banco Emisor:', leftMargin, y);
        doc.text(bancoEmisor, 70, y);
        y += lineHeight;
        
        doc.text('Taza del Día:', leftMargin, y);
        doc.text(taza, 70, y);
        y += lineHeight;
        
        // Agregar un pie de página
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Factura generada el: ' + new Date().toLocaleDateString('es-ES'), leftMargin, 280);
        
        // Limpiar el nombre del residente para usarlo en el nombre del archivo
        const cleanResidente = residente.replace(/[^a-zA-Z0-9]/g, '_');
        
        // Guardar el PDF con el nombre del residente
        doc.save(`Factura_${cleanResidente}.pdf`);
    });
});