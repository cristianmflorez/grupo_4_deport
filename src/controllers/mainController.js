const productsService = require(__dirname + '/../service/productsService');

const mainController = {
	home: (req, res) => {
		productsService.buscarTodosProductos().then((productos) => {
			res.render('home', { products: productos });
		});
	},

	carrito: (req, res) => {
		res.render('carrito');
	}
};

module.exports = mainController;
