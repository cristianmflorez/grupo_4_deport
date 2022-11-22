const productsService = require('../service/ProductsService.mjs');

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
