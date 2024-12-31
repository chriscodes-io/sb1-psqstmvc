import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createReading,
  createBatchReadings,
  getMaxPrecipitation,
  getStationData,
  getMaxTemperature
} from '../controllers/weatherController.js';

const router = express.Router();

router.post('/reading', 
  protect, 
  authorize('sensor', 'teacher'), 
  createReading
);

router.post('/readings/batch', 
  protect, 
  authorize('sensor', 'teacher'), 
  createBatchReadings
);

router.get('/precipitation/max', 
  protect, 
  getMaxPrecipitation
);

router.get('/station/:id', 
  protect, 
  getStationData
);

router.get('/temperature/max', 
  protect, 
  getMaxTemperature
);

export default router;