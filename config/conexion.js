const conectar = require("mysql");

const conexion = conectar.createConnection({
    host: "localhost",
    database: "convivir",
    user: "root",
    password: ""
});

conexion.connect(function(err){
    if (err) {
        throw err;
    }else{
        console.log("Conexión exitosa a la base de datos");
    }
});

module.exports = conexion;