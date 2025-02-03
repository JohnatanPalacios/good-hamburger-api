// tests/api.test.js
const request = require('supertest');
const app = require('../src/app');
const Order = require('../src/models/Order');

beforeEach(async () => {
  await Order.deleteMany();
});

describe('API Tests', () => {
  describe('GET /api/menu', () => {
    it('should return all products and prices', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('sandwiches');
      expect(res.body).toHaveProperty('extras');
    });
  });

  describe('POST /api/orders', () => {
    it('should create a new order with correct discount', async () => {
      const orderData = {
        sandwich: 'X Burger',
        extras: ['Fries', 'Soft drink']
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(201);
      expect(res.body.discount).toBe(20);
      expect(res.body.totalAmount).toBe(7.60); // (5 + 2 + 2.50) * 0.8
    });

    it('should reject order with duplicate items', async () => {
      const orderData = {
        sandwich: 'X Burger',
        extras: ['Fries', 'Fries']
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});