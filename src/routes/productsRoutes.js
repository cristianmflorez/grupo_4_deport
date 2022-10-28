const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multerProducts');

const adminMiddleware = require('./../middleware/adminMiddleware');

router.get('/listadoProductos/:categoria', productsController.listadoProductos);

//Crear producto

router.get('/creacionProducto', adminMiddleware, productsController.creacionProducto);

router.post('/creacionProducto', uploadFile.single('image'), productsController.crear);

//Detalle producto

router.get('/detalle/:id', productsController.detalle);

//Edicion de producto

router.get('/edicionProducto/:id', adminMiddleware, productsController.edicionProducto);

router.put('/edicionProducto/:id', uploadFile.single('image'), productsController.editar);

//Eliminar producto

router.delete('/delete/:id', adminMiddleware, productsController.delete);

module.exports = router;
