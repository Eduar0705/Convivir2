const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.get('/eliminarUsuario/:id', function(req, res) {
    const id = req.params.id;

    const eliminar = 'DELETE FROM inf_usuarios WHERE id = ?';

    conexion.query(eliminar, [id], function(error, resultados) {
        if (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(500).send('Error del servidor.');
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }
        console.log("Eliminado con exito");
        res.redirect('/admin/user_admin'); 
    });
});


module.exports = router;