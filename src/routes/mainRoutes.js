const mainController = require('./../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', mainController.home);

router.get('/carrito', mainController.carrito);

router.get('/buscar', mainController.buscar);

module.exports = router;
