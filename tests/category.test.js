const request = require('supertest');
const app = require('../src/app');

describe('Category API', () => {
  let createdCategoryId;

  it('should create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({ name: 'Test Category', description: 'Test Desc' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Category');
    createdCategoryId = res.body._id;
  });

  it('should get all categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a category by ID', async () => {
    const res = await request(app).get(`/api/categories/${createdCategoryId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', createdCategoryId);
  });

  it('should update a category', async () => {
    const res = await request(app)
      .put(`/api/categories/${createdCategoryId}`)
      .send({ name: 'Updated Category', description: 'Updated Desc' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Category');
  });

  it('should delete a category', async () => {
    const res = await request(app).delete(`/api/categories/${createdCategoryId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Category deleted');
  });
}); 