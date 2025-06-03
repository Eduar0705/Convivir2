const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesiones
app.use(session({
    secret: 'mi-secreto-super-seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 1 día
    }
}));

// Middleware para verificar autenticación
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// Middleware para verificar admin
const requireAdmin = (req, res, next) => {
    if (!req.session.userId || !req.session.isAdmin) {
        return res.redirect('/login');
    }
    next();
};

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/users');
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/registro', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/users');
    }
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

// Rutas de administrador
app.get('/admin', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/admin/proveedores', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'proveedores.html'));
});

app.get('/admin/estadisticas', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'estadistica.html'));
});

app.get('/admin/configuracion', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'configuracion.html'));
});

app.get('/admin/pagos', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagos.html'));
});

app.get('/admin/avisos', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'avisos.html'));
});

// Rutas de usuario normal
app.get('/users', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users', 'users.html'));
});

app.get('/users/configuracion', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users', 'config_usu.html'));
});

app.get('/users/pagos', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users', 'pagos_usu.html'));
});

app.get('/users/avisos', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users', 'avisos_usu.html'));
});

// Ruta para logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/users');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});
/*
// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Manejo de errores 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});*/

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});