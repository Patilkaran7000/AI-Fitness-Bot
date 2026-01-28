const request = require('supertest');
const app = require('../src/server');

describe('API Health Checks', () => {
  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /api/chat/message should require message body', async () => {
    const response = await request(app)
      .post('/api/chat/message')
      .send({});
    
    expect(response.statusCode).toBe(400);
  });

  test('GET /api/exercises should return exercises list', async () => {
    const response = await request(app).get('/api/exercises');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('exercises');
    expect(Array.isArray(response.body.exercises)).toBe(true);
  });
});

describe('Error Handling', () => {
  test('404 for non-existent route', async () => {
    const response = await request(app).get('/api/nonexistent');
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
