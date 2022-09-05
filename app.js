const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.listen(process.env.PORT || 3005, function(){
    console.log("corriendo en puerto 3005...");
})

app.get('/', (req, res)=>{
    res.sendFile((__dirname + '/views/home.html'));
});

app.get('/registro', (req, res)=>{
    res.sendFile((__dirname + '/views/registro.html'));
});

app.get('/password', (req, res)=>{
    res.sendFile((__dirname + '/views/password.html'));
});

app.get('/login', (req, res)=>{
    res.sendFile((__dirname + '/views/login.html'));
});

app.get('/detalle', (req, res)=>{
    res.sendFile((__dirname + '/views/detalle.html'));
});

app.get('/carrito', (req, res)=>{
    res.sendFile((__dirname + '/views/carrito.html'));
});