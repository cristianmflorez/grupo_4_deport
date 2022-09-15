const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const errorRoutes = require('./routes/errorRoutes');

app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.use('*', errorRoutes);

app.use('/users', usersRoutes);

app.use('/products', productsRoutes);

app.use(express.static(path.resolve(__dirname, './public')));

app.listen(port, function(){
    console.log("corriendo en puerto 3005...");
})