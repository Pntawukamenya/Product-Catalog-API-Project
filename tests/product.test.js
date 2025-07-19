const request = require('supertest');
const app = require('../src/app');

describe('Product API', () => {
  let categoryId;
  let productId;

  beforeAll(async () => {
    // Create a category to use for products
    const res = await request(app)
      .post('/api/categories')
      .send({ name: 'ProductTestCategory', description: 'For product tests' });
    categoryId = res.body._id;
  });

  afterAll(async () => {
    // Clean up: delete the test category
    await request(app).delete(`/api/categories/${categoryId}`);
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'A product for testing',
        category: categoryId,
        price: 100,
        discount: 10,
        variants: [
          { size: 'M', color: 'Red', inventory: 5 }
        ],
        inventory: 10
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Product');
    productId = res.body._id;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a product by ID', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', productId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        description: 'Updated description',
        category: categoryId,
        price: 120,
        discount: 5,
        variants: [
          { size: 'L', color: 'Blue', inventory: 3 }
        ],
        inventory: 8
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted');
  });
}); 