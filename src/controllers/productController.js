const Product = require('../models/Product');
const Category = require('../models/Category');

// Helper to calculate discounted price
function getDiscountedPrice(price, discount) {
  if (!discount) return price;
  if (discount < 1) return price; // ignore invalid
  if (discount <= 100) {
    // percent
    return price - (price * discount) / 100;
  }
  // fixed value
  return Math.max(0, price - discount);
}

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, discount, variants, inventory } = req.body;
    // Validate category exists
    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ message: 'Invalid category' });
    const product = new Product({ name, description, category, price, discount, variants, inventory });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products (with search/filter)
exports.getProducts = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice, lowStock } = req.query;
    let filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (lowStock) filter.inventory = { $lte: Number(lowStock) };
    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get a product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, discount, variants, inventory } = req.body;
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) return res.status(400).json({ message: 'Invalid category' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, discount, variants, inventory },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

// Get low-stock products (reporting)
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const threshold = Number(req.query.threshold) || 5;
    const products = await Product.find({ inventory: { $lte: threshold } });
    res.json(products);
  } catch (err) {
    next(err);
  }
}; 