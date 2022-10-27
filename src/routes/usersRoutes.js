const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multer');

router.get('/login', usersController.login);

router.get('/password', usersController.password);

router.get('/perfil', usersController.perfil);

router.get('/registro', usersController.registro);

router.post('/registro', usersController.crear);

router.delete('/delete/:id', usersController.delete);

module.exports = router;
