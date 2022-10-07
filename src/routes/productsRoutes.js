const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/imagenes'))
    },
    filename: function(req,file,cb){
        cb(null, `img_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({storage: storage});

router.get('/listadoProductos/:categoria', productsController.listadoProductos);

//Crear producto

router.get('/creacionProducto', productsController.creacionProducto)
router.post('/creacionProducto', uploadFile.single('image'), productsController.crear);

//Detalle producto

router.get('/detalle', productsController.detalle);

//Edicion de producto

router.get('/edicionProducto/:id', productsController.edicionProducto);

router.put('/edicionProducto/:id', uploadFile.single('image'), productsController.editar);

//Eliminar producto

router.delete('/:id/', productsController.delete);

module.exports = router;
