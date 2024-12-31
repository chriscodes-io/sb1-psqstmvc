import request from 'supertest';
import app from '../src/server.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API Endpoints', () => {
  let token;
  
  beforeAll(async () => {
    // Get authentication token
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'teacher@test.com',
        password: 'password123'
      });
    token = response.body.token;
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const user = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        role: 'user'
      };

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send(user);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });
  });
});