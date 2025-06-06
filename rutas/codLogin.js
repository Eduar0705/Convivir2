const express = require('express');
const router = express.Router();
const link = require('../config/link');
const conexion = require('../config/conexion');

router.post('/codLogin', function(req, res){
    const {user, pass} = req.body;

    const validar = `SELECT * FROM inf_usuarios WHERE usuario = '${user}'`;
    conexion.query(validar, async function(error, rows){
        let mensaje;
        if (error) {
            console.log("Error en la consulta de usuario", error);
            return res.status(500).send("Error en el servidor");
        }

        if (rows.length <= 0) {
            mensaje = "El usuario no existe";
            return res.render('login', { mensaje, link });
        }

        const user = rows[0];

        if (!pass || !user.pass) {
            mensaje = "Contraseña incorrecta";
            return res.render('login', { mensaje, link });
        }

        // Almacenar datos en sesión (sin clave)
        req.session.login = true;
        req.session.id = user.id;
        req.session.nombre_A = user.nombre_apellido;
        req.session.usuario = user.usuario;
        req.session.email = user.email;
        req.session.telefono = user.telefono;
        req.session.cedula = user.cedula;
        req.session.edificio = user.edificio;
        req.session.apartamento = user.apartamento;
        req.session.id_cargo = user.id_cargo;
        req.session.fecha = user.fecha;

        console.log(req.session);

        if (user.id_cargo === 1) {
            return res.redirect('/admin');
        } else if (user.id_cargo === 2) {
            return res.redirect('/users');
        } else {
            mensaje = "Rol de usuario no válido";
            return res.render('login', { mensaje, link });
        }
    });
});

module.exports = router;