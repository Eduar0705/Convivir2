document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Función para alternar sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('show');
        document.body.classList.toggle('sidebar-open');
    }
    
    // Alternar sidebar desde los botones
    menuToggle?.addEventListener('click', toggleSidebar);
    sidebarToggle?.addEventListener('click', toggleSidebar);
    
    // Cerrar sidebar al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
        if(window.innerWidth <= 992 && 
            sidebar.classList.contains('show') && 
            !e.target.closest('.sidebar') && 
            !e.target.closest('.menu-toggle')) {
            toggleSidebar();
        }
    });
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', function() {
        if(window.innerWidth > 992) {
            sidebar.classList.remove('show');
            document.body.classList.remove('sidebar-open');
        }
    });
});