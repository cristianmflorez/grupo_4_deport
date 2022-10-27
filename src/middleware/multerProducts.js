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

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;