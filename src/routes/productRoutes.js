const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidator, idParamValidator, validate } = require('../middlewares/validators');

// Create
router.post('/', productValidator, validate, productController.createProduct);
// Read all (with search/filter)
router.get('/', productController.getProducts);
// Read one
router.get('/:id', idParamValidator, validate, productController.getProductById);
// Update
router.put('/:id', idParamValidator, validate, productValidator, validate, productController.updateProduct);
// Delete
router.delete('/:id', idParamValidator, validate, productController.deleteProduct);
// Low-stock reporting
router.get('/report/low-stock', productController.getLowStockProducts);

module.exports = router; 