document.getElementById('buscar_cedula').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
});

// FUNCIONES DE BUSCAR Y LIMPIAR
document.addEventListener('DOMContentLoaded', function() {
    const buscarInput = document.getElementById('buscar_cedula');
    const btnBuscar = document.getElementById('btnBuscarCedula');
    const btnLimpiar = document.getElementById('btnLimpiarCedula');
    const tabla = document.querySelector('.crud table tbody');

    // Crear mensaje de "no encontrado"
    let mensajeNoEncontrado = document.createElement('tr');
    mensajeNoEncontrado.innerHTML = `<td colspan="${tabla.parentElement.querySelectorAll('thead th').length}" style="text-align:center; color:red; font-size: 1.5em;">Cédula no encontrada</td>`;
    mensajeNoEncontrado.style.display = 'none';

    // Asegura que el mensaje solo se agregue una vez
    if (!tabla.querySelector('.mensaje-no-encontrado')) {
        mensajeNoEncontrado.classList.add('mensaje-no-encontrado');
        tabla.appendChild(mensajeNoEncontrado);
    }

    btnBuscar.addEventListener('click', function() {
        const cedula = buscarInput.value.trim();
        let encontrado = false;

        if (!cedula) {
            Array.from(tabla.rows).forEach(row => row.style.display = '');
            mensajeNoEncontrado.style.display = 'none';
            return;
        }

        Array.from(tabla.rows).forEach(row => {
            // Busca la columna de cédula (índice 5)
            const celdaCedula = row.cells[5];
            if (celdaCedula && celdaCedula.textContent.includes(cedula)) {
                row.style.display = '';
                encontrado = true;
            } else if (!row.classList.contains('mensaje-no-encontrado')) {
                row.style.display = 'none';
            }
        });

        mensajeNoEncontrado.style.display = encontrado ? 'none' : '';
    });

    btnLimpiar.addEventListener('click', function() {
        buscarInput.value = '';
        Array.from(tabla.rows).forEach(row => row.style.display = '');
        mensajeNoEncontrado.style.display = 'none';
    });
});
// VERIFICA QUE TELEFONO SEA SOLO NUMEROS
document.getElementById('telefono').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+]/g, '').slice(0, 13);
});

// VERIFICA QUE CEDULA SEA SOLO NÚMEROS CON MÁXIMO 8 DÍGITOS Y MÍNIMO 7
document.getElementById('cedula').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
});

// VERIFICA QUE EN NOMBRE Y APELLIDO SOLO HAYA LETRAS
document.getElementById('name').addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
});

// VERIFICA QUE EN USUARIO SOLO HAYA LETRAS Y NÚMEROS
document.getElementById('user').addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
});
// Verificación que los campos no estén vacíos del formulario con alertas modernas
document.getElementById('loginForm').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value.trim();
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const cedula = document.getElementById('cedula').value.trim();

    if (!name || !user || !pass || !email || !telefono || !cedula) {
        e.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos obligatorios.',
            confirmButtonText: 'Aceptar'
        });
    }
});
function eliminarUsuario(id) {
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
            window.location.href = '/eliminarUsuario/' + id;
        }
    });
}