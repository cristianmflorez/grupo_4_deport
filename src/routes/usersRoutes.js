const usersController = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multerUsers');
const path = require('path');
const User = require('../../models/User');

const guestMiddleware = require('./../middleware/guestMiddleware');
const authMiddleware = require('./../middleware/authMiddleware');

const { body } = require('express-validator');

const validacionesRegistro = [
    body('nombre').notEmpty().withMessage('Ingresa el nombre de usuario').bail()
        .isLength({min:4}).withMessage('El nombre de usuario debe tener como mínimo 4 caracteres'),
    body('correo').notEmpty().withMessage('Ingresa el correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes llenar este campo').bail()
        .isLength({ min: 6 }).withMessage('La clave debe tener como mínimo 6 caracteres'),
    body('passwordConfirm').notEmpty().withMessage('Debes llenar este campo').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('La contraseña de confirmación no coincide con la contraseña anterior');
            }
            return true;
        }),
    body('telefono').notEmpty().withMessage('Ingresa tu número de teléfono'),
    body('direccion').notEmpty().withMessage('Ingresa tu dirección de residencia'),
    body('pais').notEmpty().withMessage('Selecciona tu país de residencia'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error('Tienes que cargar una imagen');
        } else {
            let fileExtension = path.extname(file.filename);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

const validacionesLogin = [
    body('correo').notEmpty().withMessage('Ingresa el correo de tu cuenta').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido').bail()
        .custom((value, { req }) => {
            let userToLogin = User.findByField('email', req.body.correo.trim());
            if (!userToLogin) {
              throw new Error('El correo no está registrado');
            }
            return true;
        }).bail(),
    body('password').notEmpty().withMessage('Debes llenar este campo').bail()
        .isLength({ min: 4 }).withMessage('La clave debe tener como mínimo 4 caracteres'),
];

const validacionesPerfil = [
    body('nombre').notEmpty().withMessage('Ingresa el nombre de usuario').bail()
        .isLength({min:4}).withMessage('El nombre de usuario debe tener como mínimo 4 caracteres'),
    body('correo').notEmpty().withMessage('Ingresa el correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('telefono').notEmpty().withMessage('Ingresa tu número de teléfono'),
    body('direccion').notEmpty().withMessage('Ingresa tu dirección de residencia'),
    body('pais').notEmpty().withMessage('Selecciona tu país de residencia'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (file) {
            let fileExtension = path.extname(file.filename);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }       
        return true;
    })
];





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
