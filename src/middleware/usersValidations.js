const { body } = require('express-validator');
const path = require('path');
const usersService = require('../service/usersService');

const validacionesRegistro = [
	body('nombre')
		.notEmpty()
		.withMessage('Ingresa el nombre de usuario')
		.bail()
		.isLength({ min: 4 })
		.withMessage('El nombre de usuario debe tener como mínimo 4 caracteres'),
	body('correo')
		.notEmpty()
		.withMessage('Ingresa el correo electrónico')
		.bail()
		.isEmail()
		.withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty()
		.withMessage('Debes llenar este campo')
		.bail()
		.isLength({ min: 6 })
		.withMessage('La clave debe tener como mínimo 6 caracteres'),
	body('passwordConfirm')
		.notEmpty()
		.withMessage('Debes llenar este campo')
		.bail()
		.custom((value, {req}) => {
			if (value != req.body.password) {
				throw new Error(
					'La contraseña de confirmación no coincide con la contraseña anterior'
				);
			}
			return true;
		}),
	body('telefono').notEmpty().withMessage('Ingresa tu número de teléfono'),
	body('direccion')
		.notEmpty()
		.withMessage('Ingresa tu dirección de residencia'),
	body('pais').notEmpty().withMessage('Selecciona tu país de residencia'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
		if (file) {
			let fileExtension = path.extname(file.filename);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`
				);
			}
		}
		return true;
	})
];

const validacionesLogin = [
	body('correo')
		.notEmpty()
		.withMessage('Ingresa el correo de tu cuenta')
		.bail()
		.isEmail()
		.withMessage('Debes escribir un formato de correo válido')
		.bail()
		.custom((value) => {
			usersService.buscarUsuarioEmail(value).then((usuario) => {
				if (!usuario) {
					console.log('El correo no está registrado');
				}
			});
			return true;
		}),
	body('password')
		.notEmpty()
		.withMessage('Debes llenar este campo')
		.bail()
		.isLength({ min: 4 })
		.withMessage('La clave debe tener como mínimo 4 caracteres')
];

const validacionesPerfil = [
	body('nombre')
		.notEmpty()
		.withMessage('Ingresa el nombre de usuario')
		.bail()
		.isLength({ min: 4 })
		.withMessage('El nombre de usuario debe tener como mínimo 4 caracteres'),
	body('correo')
		.notEmpty()
		.withMessage('Ingresa el correo electrónico')
		.bail()
		.isEmail()
		.withMessage('Debes escribir un formato de correo válido'),
	body('telefono').notEmpty().withMessage('Ingresa tu número de teléfono'),
	body('direccion')
		.notEmpty()
		.withMessage('Ingresa tu dirección de residencia'),
	body('pais').notEmpty().withMessage('Selecciona tu país de residencia'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
		if (file) {
			let fileExtension = path.extname(file.filename);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`
				);
			}
		}
		return true;
	})
];

module.exports = {
	validacionesLogin,
	validacionesPerfil,
	validacionesRegistro
};
