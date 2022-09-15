const productsController = require('../controllers/productsController')
const express = require('express');
const router = express.Router();

router.get('/creacionProducto', productsController.creacionProducto)

router.get('/detalle', productsController.detalle)

router.get('/edicionProducto', productsController.edicionProducto)

router.get('/listadoProductos', productsController.listadoProductos)


module.exports = router;

