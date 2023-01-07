const express = require('express');
const path = require('path');
const app = express();
const override = require('method-override');
const cookies = require('cookie-parser');

const session = require('express-session');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const apiRoutes = require('./routes/apiRoutes');

const cors = require('cors');

app.use(cors());

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(override('_method'));

app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.use('/', mainRoutes);

app.use('/users', usersRoutes);

app.use('/products', productsRoutes);

app.use('/api', apiRoutes);

app.use((req, res, next) => {
	res.status(404).render('errorPage');
});

module.exports = app;