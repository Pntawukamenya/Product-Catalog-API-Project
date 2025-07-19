const { body, param } = require('express-validator');

exports.categoryValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
];

exports.productValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('category').notEmpty().withMessage('Category is required').isMongoId(),
  body('price').notEmpty().withMessage('Price is required').isNumeric(),
  body('discount').optional().isNumeric(),
  body('variants').optional().isArray(),
  body('inventory').optional().isNumeric(),
];

exports.idParamValidator = [
  param('id').isMongoId().withMessage('Invalid ID'),
];

exports.validate = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 