const apiController = require('./../controllers/apiController');
const express = require('express');
const router = express.Router();

router.get('/users', apiController.userList);
router.get('/users/last', apiController.lastUser);
router.get('/users/:id', apiController.oneUser);

router.get('/products', apiController.productsList);
router.get('/products/last', apiController.lastProduct);
router.get('/products/:id', apiController.oneProduct);

router.get('/categories', apiController.categoriesList);
router.get('/purchases', apiController.purchasesList);

module.exports = router;