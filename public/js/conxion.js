const { text } = require('express');
let mysql = require('mysql');

// CONEXIÓN A LA BASE DE DATOS
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'convivir'
});

// VERIFICAR LA CONEXIÓN A LA BASE DE DATOS
conexion.connect(function(err){
    if(err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }else {
        console.log('Conexión a la base de datos establecida');
    }
});

//BASE DE DATOS PARA BUSCAR USUARIO, CLAVE Y EL ID_CARGO
const inf_usuario = `SELECT usuario, clave, id_cargo FROM inf_usuarios WHERE 1 `;
conexion.query(inf_usuario, function(erro, result){
    if(erro){
        console.log(erro);
    }else{
        console.log(result);
    }
});

conexion.end();