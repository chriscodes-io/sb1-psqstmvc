import { body, param, query } from 'express-validator';

export const weatherValidation = {
  createReading: [
    body('deviceName').notEmpty().trim(),
    body('time').isISO8601(),
    body('latitude').isFloat({ min: -90, max: 90 }),
    body('longitude').isFloat({ min: -180, max: 180 }),
    body('temperature').isFloat({ min: -50, max: 60 }),
    body('atmosphericPressure').isFloat({ min: 0 }),
    body('maxWindSpeed').isFloat({ min: 0 }),
    body('solarRadiation').isFloat({ min: 0 }),
    body('vaporPressure').isFloat({ min: 0 }),
    body('humidity').isFloat({ min: 0, max: 100 }),
    body('windDirection').isFloat({ min: 0, max: 360 }),
    body('precipitation').isFloat({ min: 0 })
  ],
  getMaxTemperature: [
    query('startDate').isISO8601(),
    query('endDate').isISO8601()
  ]
};

export const userValidation = {
  createUser: [
    body('username').notEmpty().trim(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['teacher', 'user', 'sensor'])
  ],
  deleteStudents: [
    body('startDate').isISO8601(),
    body('endDate').isISO8601()
  ]
};