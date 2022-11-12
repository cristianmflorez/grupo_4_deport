const { body } = require('express-validator');
const path = require('path');

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
    // body('image').custom((value, { req }) => { LO QUE HICIMOS CON NICO
    //     if (!req.file){
    //         throw new Error('Tienes que subir una imagen');
    //     }
    //     else if (req.file.error === 'type'){
    //         let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
    //         throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
    //     } 
    //     return true;
    // })
];


module.exports = {validacionesCreacionProducto, validacionesEdicionProducto};