const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidator, idParamValidator, validate } = require('../middlewares/validators');

// Create
router.post('/', categoryValidator, validate, categoryController.createCategory);
// Read all
router.get('/', categoryController.getCategories);
// Read one
router.get('/:id', idParamValidator, validate, categoryController.getCategoryById);
// Update
router.put('/:id', idParamValidator, validate, categoryValidator, validate, categoryController.updateCategory);
// Delete
router.delete('/:id', idParamValidator, validate, categoryController.deleteCategory);

module.exports = router; 