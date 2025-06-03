// Función para mostrar/ocultar contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.querySelector(`.toggle-password`);
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
        toggleButton.setAttribute('aria-label', 'Ocultar contraseña');
    } else {
        passwordInput.type = "password";
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
        toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
    }
}

// Asignar evento al botón de mostrar/ocultar contraseña
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // Nota: Cambié 'clave' por 'pass' para que coincida con tu HTML
            togglePassword('pass');
        });
    }
    
    // Opcional: Validación básica del formulario
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('user').value;
            const password = document.getElementById('pass').value;
            
            if (!username || !password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vacíos',
                    text: 'Por favor ingrese todos los campos'
                });
            } else {
                // Aquí iría la lógica de autenticación
                console.log('Iniciando sesión...');
            }
        });
    }
});