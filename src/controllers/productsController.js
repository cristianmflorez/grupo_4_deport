const products = require('../data/productsJSON.json');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

//const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
	creacionProducto: (req, res) => {
		res.render('./products/creacionProducto');
	},

	detalle: (req, res) => {
		res.render('./products/detalle');
	},

	edicionProducto: (req, res) => {
		res.render('./products/edicionProducto');
	},

	listadoProductos: (req, res) => {
		let deporteIngresado = req.params.categoria;
		//console.log(deporteIngresado)
		let paraLaVista = products.filter(elemento => elemento.category == deporteIngresado);
		res.render('./products/listadoProductos', {productos: paraLaVista});
	},

	delete: (req, res) => {
		let idProduct = req.params.id;
		let deleteImg = '';
		for (let p of products) {
			if (p.id == idProduct) {
				deleteImg = p.image;
				p.deleted = 1;
				break;
			}
		}
		fs.writeFileSync(
			path.join(__dirname, '/../data/productsJSON.json'),
			JSON.stringify(products, null, ' '),
			'utf-8'
		);
		fs.unlick(__dirname + '/../../public/products/' + deleteImg);
		res.redirect('/');
	}
};

module.exports = productsController;
