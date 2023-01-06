const mainController = require('./../controllers/mainController');
const express = require('express');
const router = express.Router();

const authMiddleware = require('./../middleware/authMiddleware');

router.get('/', mainController.home);

router.get('/carrito', authMiddleware, mainController.carrito);
router.post('/carrito', mainController.compra);

router.get('/buscar', mainController.buscar);

module.exports = router;
