const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const uploadFile = require('./../middleware/multerProducts');

const adminMiddleware = require('./../middleware/adminMiddleware');

const path = require('path');
const { body } = require('express-validator');

const validacionesCreacionProducto = [
    body('name').notEmpty().withMessage('Ingresa el nombre del producto'),
    body('price').notEmpty().withMessage('Debes llenar este campo'),
    body('discount').notEmpty().withMessage('Debes llenar este campo'),
    body('description').notEmpty().withMessage('Debes llenar este campo'),
    body('material').notEmpty().withMessage('Debes llenar este campo'),
    body('weight').notEmpty().withMessage('Ingresa el peso del producto'),
    body('origin').notEmpty().withMessage('Especifica si el producto es Nacional o Importado'),
    body('category').notEmpty().withMessage('Selecciona la categoría del producto'),
    body('type').notEmpty().withMessage('Selecciona el tipo del producto'),
    body('color').notEmpty().withMessage('Digita el color del producto'),
    body('pais').notEmpty().withMessage('Selecciona el(los) país(es) donde hay disponibilidad del producto'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) { //DSC: Aquí hay como una especie de trampa en la validación, preguntar luego como manejar errores.
            throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
        } 
        return true;
    })
];

const validacionesEdicionProducto = [
    body('name').notEmpty().withMessage('Ingresa el nombre del producto'),
    body('price').notEmpty().withMessage('Debes llenar este campo'),
    body('discount').notEmpty().withMessage('Debes llenar este campo'),
    body('description').notEmpty().withMessage('Debes llenar este campo'),
    body('material').notEmpty().withMessage('Debes llenar este campo'),
    body('weight').notEmpty().withMessage('Ingresa el peso del producto'),
    body('origin').notEmpty().withMessage('Especifica si el producto es Nacional o Importado'),
    body('category').notEmpty().withMessage('Selecciona la categoría del producto'),
    body('type').notEmpty().withMessage('Selecciona el tipo del producto'),
    body('color').notEmpty().withMessage('Digita el color del producto'),
    body('pais').notEmpty().withMessage('Selecciona el país donde hay disponibilidad del producto'),
    body('image').custom((value, { req }) => {
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

router.get('/listadoProductos/:categoria', productsController.listadoProductos);

//Crear producto

router.get('/creacionProducto', adminMiddleware, productsController.creacionProducto);

router.post('/creacionProducto', uploadFile.single('image'), validacionesCreacionProducto, productsController.crear);

//Detalle producto

router.get('/detalle/:id', productsController.detalle);

//Edicion de producto

router.get('/edicionProducto/:id', adminMiddleware, productsController.edicionProducto);

router.put('/edicionProducto/:id', uploadFile.single('image'), validacionesEdicionProducto, productsController.editar);

//Eliminar producto

router.delete('/delete/:id', adminMiddleware, productsController.delete);

module.exports = router;
