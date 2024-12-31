import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createUser,
  deleteUser,
  deleteStudents,
  updatePrecipitation,
  updateAccessLevels
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', 
  protect, 
  authorize('teacher'), 
  createUser
);

router.delete('/:id', 
  protect, 
  authorize('teacher'), 
  deleteUser
);

router.delete('/students', 
  protect, 
  authorize('teacher'), 
  deleteStudents
);

router.patch('/precipitation', 
  protect, 
  authorize('teacher'), 
  updatePrecipitation
);

router.patch('/access', 
  protect, 
  authorize('teacher'), 
  updateAccessLevels
);

export default router;