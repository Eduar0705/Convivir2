const conectar = require("mysql");

const conexion = conectar.createConnection({
    host: "mysql-convivir.alwaysdata.net",
    database: "convivir_bd",
    user: "convivir",
    password: "31466704"
});

conexion.connect(function(err){
    if (err) {
        throw err;
    }else{
        console.log("Conexión exitosa a la base de datos");
    }
});

module.exports = conexion;