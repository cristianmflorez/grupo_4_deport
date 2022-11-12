const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/imagenes/products'));
	},
	filename: function (req, file, cb) {
		cb(null, `img_${Date.now()}_${path.extname(file.originalname)}`);
	}
});

const fileFilter = (req, file, cb) => { //Esto es para evitar que suban archivos que no son imagenes
	if(file.mimetype.includes('image/jpg') || file.mimetype.includes('image/jpeg') || file.mimetype.includes('image/png')){
		cb(null, true);
	} else{
		//otra forma, que reemplaza las dos lineas siguientes es poner: cb(new multer.MulterError('not a PNG'), false);
		cb(null, false);
		//return cb(new Error('No se admite ese formato'));
	}
};

// const fileFilter = (req, file, cb) => { //LO QUE HICIMOS CON NICO
// 	if(file.mimetype !== 'image/jpg'){
// 		file.error = 'type';
// 		file = req.file;
// 		return cb(null, false, new Error('Tipo erróneo'));
// 	}
// 	return cb(null, true);
// };


const limits = { //DSC: Aún no sirve
	fileSize: 1024*1024*1, // Tamaño de la imagen en bytes, 1MB
	fieldNameSize: 50 //cantidad max de caracteres que puede tener el nombre de la imagen que sube el usuario
};

const uploadFile = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = uploadFile;