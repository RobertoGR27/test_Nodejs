const { Socket } = require('dgram');
const express = require('express');
const app= express();

//creación de un servidor http a partir de la libreria de express
const http = require('http').Server(app);
//para generar la comunicación para trabajar con socket.io
const io=require('socket.io')(http);

//routes

app.use(require('./routes/videoLlamada.routes'));

//ruta de los archivos html para las pantallas
app.use(express.static(__dirname+"/public"));

//Para el uso de la camara
io.on('connection',(socket)=>{
    socket.on('stream',(image)=>{
        socket.broadcast.emit('stream', image);
    })
})

module.exports=http;