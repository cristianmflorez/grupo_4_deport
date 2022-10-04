const mainController = require('./../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', mainController.home);

router.get('/carrito', mainController.carrito);

module.exports = router;
