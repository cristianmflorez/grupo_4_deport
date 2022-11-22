import { buscarTodosProductos } from '../service/productsService';

const mainController = {
	home: (req, res) => {
		buscarTodosProductos().then((productos) => {
			res.render('home', { products: productos });
		});
	},

	carrito: (req, res) => {
		res.render('carrito');
	}
};

export default mainController;
