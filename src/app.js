const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const errorRoutes = require('./routes/errorRoutes');

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, './../public')));

app.use('/', mainRoutes);

app.use('/users', usersRoutes);

app.use('/products', productsRoutes);

app.use('*', errorRoutes);

app.listen(port, function(){
    console.log("corriendo en puerto 3005...");
})