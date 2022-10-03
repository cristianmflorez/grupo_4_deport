const products = require('./../data/products.json');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

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
        res.render('./products/listadoProductos');
    },

    delete: (req, res) => {
        let idProduct = req.params.id;
        let deleteImg = '';
        for (let p of products) {
            if(p.id == idProduct){
                deleteImg = p.img;
                p.deleted = 1;
                break;
            }
        }
        fs.writeFileSync(path.join(__dirname, '/../data/products.json'), JSON.stringify(products, null, ' '), 'utf-8');
        fs.unlick(__dirname + '/../../public/products/' + deleteImg); 
        res.redirect('/');
    }
}

module.exports = productsController;
