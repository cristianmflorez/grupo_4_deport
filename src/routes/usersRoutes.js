const usersController = require('../controllers/usersController')
const express = require('express');
const router = express.Router();

router.get('/login', usersController.login)

router.get('/password', usersController.password)

router.get('/perfil', usersController.perfil)

router.get('/registro', usersController.registro)

module.exports = router;
