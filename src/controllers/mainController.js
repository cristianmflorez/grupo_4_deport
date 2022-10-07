const path = require('path');
const fs = require('fs');
const { json } = require('express');

const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
	home: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('home', {products: products});
	},

	carrito: (req, res) => {
		res.render('carrito');
	}
};

module.exports = mainController;
