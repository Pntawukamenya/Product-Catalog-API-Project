const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
setupSwagger(app);
app.use(errorHandler);

// Root route
app.get('/', (req, res) => {
  res.send('Product Catalog API is running');
});

// TODO: Import and use routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware (to be added)

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
