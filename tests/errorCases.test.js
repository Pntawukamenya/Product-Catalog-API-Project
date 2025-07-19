const request = require('supertest');
const app = require('../src/app');

describe('API Error Cases', () => {
  it('should return 404 for non-existent category', async () => {
    const res = await request(app).get('/api/categories/000000000000000000000000');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Category not found');
  });

  it('should return 400 for invalid category ID', async () => {
    const res = await request(app).get('/api/categories/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 for missing required fields when creating category', async () => {
    const res = await request(app).post('/api/categories').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 for missing required fields when creating product', async () => {
    const res = await request(app).post('/api/products').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 for invalid product category', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Invalid Product',
        description: 'Should fail',
        category: '000000000000000000000000', // non-existent
        price: 10
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid category');
  });
}); 