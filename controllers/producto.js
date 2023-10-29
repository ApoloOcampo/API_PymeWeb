require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/


//metodo post Producto
module.exports.agregar = app.post('/', (req, res) => {
    const { Nombre, Tipo, Marca, Descripcion, Precio, Stock, Volumen, Estado } = req.body;
    const sql = `INSERT INTO producto ( 
                nombre, 
                tipo,
                marca,
                descripcion,
                precio,
                stock,
                volumen,
                estado,
                VALUES (?,?,?,?,?,?,?,?)`;
    const values = [ Nombre, Tipo, Marca, Descripcion, Precio, Stock, Volumen, 1 ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('El producto ha sido agregado exitosamente');
    });
});


//metodo get Productos activos
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT id_producto, 
                    nombre, 
                    tipo,
                    marca,
                    descripcion,
                    precio,
                    stock,
                    volumen,
                    estado
                FROM producto
                WHERE estado = 1`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

//metodo patch Producto
module.exports.actualizar = app.patch('/', (request, response) => {  
    const {
        Id_producto,
        Nombre,
        Tipo,
        Marca,
        Descripcion,
        Precio,
        Stock,
        Volumen

    } = request.body;
    
    const sql = `
        UPDATE producto
        SET nombre = ?,
            tipo = ?,
            marca = ?,
            descripcion = ?,
            precio = ?,
            stock = ?,
            volumen = ?
        WHERE id_producto = ?
    `;

    const values = [
        Nombre,
        Tipo,
        Marca,
        Descripcion,
        Precio,
        Stock,
        Volumen,
        Id_producto
    ];
    
    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        response.send(`El producto ${Nombre} fue actualizado correctamente`);
    });               
});

//metodo delete Producto
module.exports.eliminar = app.delete('/', (request, response) => {
    const { Id_producto } = request.body;
    const sql = `DELETE FROM producto 
                WHERE id_producto = ?`;
    connection.query(sql, Id_producto, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`El producto con id ${Id_producto} eliminado correctamente`);
      } else {
        response.status(404).send(`El producto con id ${Id_producto} no encontrado`);
      }
    });
});

//metodo PUT Producto = 0
module.exports.eliminar_estado = app.put('/', (request, response) => {
    const { Id_producto } = request.body;
    const sql = `UPDATE producto 
                SET estado = 0 
                WHERE id_producto = ?`;
    connection.query(sql, id_especies, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Producto con id ${Id_producto} eliminado correctamente`);
      } else {
        response.status(404).send(`Producto con id ${Id_producto} no encontrado`);
      }
    });
});

