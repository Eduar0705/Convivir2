//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const app = express();

//CONFIGURACIONES
app.set("view engine", "ejs");//PAGINAS DE DINAMICAS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Manejo de sesiones
app.use(session({
    secret:"tu_clave",
    resave: false,
    saveUninitialized: false
}));

//RUTAS DINAMICAS Y ESTATICAS
app.use(express.static('public'));
app.use(require('./rutas/login'));
app.use(require('./rutas/regUsuario'));
app.use(require('./rutas/regUsuario_admin'));
app.use(require('./rutas/codLogin'));
app.use(require('./rutas/admin'));
app.use(require('./rutas/users'));
app.use(require('./rutas/avisos'));
app.use(require('./rutas/user_admin'));
app.use(require('./rutas/pagos'));
const deleteUser = require('./rutas/delete_user');
app.use('/', deleteUser);

//PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    if(PORT === 3000){
        console.log("http://localhost:3000");
    }else{
        console.log(PORT);
    }
});
