import express from 'express';
import {
    enrollCourse,
    getMyCourses,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, enrollCourse);
router.route('/my-courses').get(protect, getMyCourses);

export default router;
