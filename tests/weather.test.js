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

describe('Weather API Endpoints', () => {
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

  describe('POST /api/weather/reading', () => {
    it('should create a new weather reading', async () => {
      const reading = {
        deviceName: 'TEST001',
        time: new Date().toISOString(),
        latitude: -27.4705,
        longitude: 153.0260,
        temperature: 25.5,
        atmosphericPressure: 101.3,
        maxWindSpeed: 5.2,
        solarRadiation: 850,
        vaporPressure: 2.3,
        humidity: 65,
        windDirection: 180,
        precipitation: 0.2
      };

      const response = await request(app)
        .post('/api/weather/reading')
        .set('Authorization', `Bearer ${token}`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });
  });
});