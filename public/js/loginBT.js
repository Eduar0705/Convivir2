document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de toggle password
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            // Encontrar el input de password anterior (asumiendo la misma estructura HTML)
            const passwordInput = this.previousElementSibling;

            if (
                !passwordInput ||
                (passwordInput.type !== 'password' && passwordInput.type !== 'text')
            ) {
                console.error('Campo de contraseña no encontrado');
                return;
            }

            // Alternar el tipo de input
            const isShowing = passwordInput.type === "text";
            passwordInput.type = isShowing ? "password" : "text";

            // Cambiar el icono
            const icon = isShowing ? 'eye' : 'eye-slash';
            this.innerHTML = `<i class="fas fa-${icon}"></i>`;

            // Actualizar ARIA
            this.setAttribute(
                'aria-label',
                isShowing ? 'Mostrar contraseña' : 'Ocultar contraseña'
            );

            // Mantener el foco
            passwordInput.focus();
        });
    });

    // VERIFICA QUE APARTAMENTO SEA SOLO NUMEROS
    document.getElementById('apartamento').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 2);
    });

    // VERIFICA QUE TELEFONO SEA SOLO NUMEROS
    document.getElementById('telefono').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);
    });

    // VERIFICA QUE CEDULA SEA SOLO NÚMEROS CON MÁXIMO 8 DÍGITOS Y MÍNIMO 7
    document.getElementById('cedula').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
    });

    //VERFICA QUE EN NOMBRE Y APELLIDO SOLO HAYA LETRAS
    document.getElementById('name').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    });
    //VERFICA QUE EN USUARIO SOLO HAYA LETRAS Y NÚMEROS
    document.getElementById('user').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        const cedula = document.getElementById('cedula').value;
        if (cedula.length < 7) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La cédula debe tener al menos 7 dígitos.'
            });
        }
    });

    // VERIFICACION QUE LOS CAMPOS NO ESTEN VACIOS
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const edificio = document.getElementById('edificio').value;
        const apartamento = document.getElementById('apartamento').value.trim();

        if (!name || !user || !pass || !email || !telefono || !cedula || !edificio || !apartamento) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos.'
            });
        }
    });
});