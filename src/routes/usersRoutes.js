const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multerUsers');


const guestMiddleware = require('./../middleware/guestMiddleware');
const authMiddleware = require('./../middleware/authMiddleware');

const {validacionesRegistro, validacionesLogin, validacionesPerfil} = require('../middleware/usersValidations');



router.get('/login', guestMiddleware, usersController.login);

//Procesar el login
router.post('/login', validacionesLogin, usersController.loginProcess);

router.get('/perfil', authMiddleware, usersController.perfil);

router.put('/perfil/:id',  uploadFile.single('avatar'), validacionesPerfil, usersController.editar);

router.get('/registro', guestMiddleware, usersController.registro);

router.post('/registro', uploadFile.single('avatar'), validacionesRegistro, usersController.crear);

router.delete('/delete/:id', usersController.delete);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;
