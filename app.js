require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.port || 5500;

// configuración body parser para permitir json, y url encoded
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require('./config/config');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

app.get("/api/test/",function(request,response){
	response.send("Bienvenido a API ");
});


// Se inicia servidor
app.listen(port, function (){
    console.log('Servidor esta corriendo! http://localhost:5500/');
	controladores();
});

const producto = require('./controllers/producto');

//metodos
function controladores() {
    // // rutas
    //Funcion de consultar Producto
    app.use('/api/producto/', producto.agregar);
	app.use('/api/producto/', producto.buscar_todo);
    app.use('/api/producto/', producto.actualizar);
    app.use('/api/producto/', producto.eliminar);
    app.use('/api/producto/', producto.eliminar_estado);
}