const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multerUsers');

const guestMiddleware = require('./../middleware/guestMiddleware');
const authMiddleware = require('./../middleware/authMiddleware');

router.get('/login', guestMiddleware, usersController.login);

//Procesar el loggin
router.post('/login', usersController.loginProcess);

router.get('/perfil', authMiddleware, usersController.perfil);

router.get('/registro', guestMiddleware, usersController.registro);

router.post('/registro', usersController.crear);

router.delete('/delete/:id', usersController.delete);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;
