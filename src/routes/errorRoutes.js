const errorController = require('./../controllers/errorController')
const express = require('express');
const router = express.Router();

router.get('/', errorController.error);

module.exports = router;