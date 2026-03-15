import asyncHandler from 'express-async-handler';
import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private/Student
const enrollCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
        student: req.user._id,
        course: courseId,
    });

    if (alreadyEnrolled) {
        res.status(400);
        throw new Error('You are already enrolled in this course');
    }

    const enrollment = new Enrollment({
        student: req.user._id,
        course: courseId,
        progress: 0,
    });

    const createdEnrollment = await enrollment.save();
    res.status(201).json(createdEnrollment);
});

// @desc    Get logged in user courses
// @route   GET /api/enrollments/my-courses
// @access  Private
const getMyCourses = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
        path: 'course',
        populate: {
            path: 'instructor',
            select: 'name'
        }
    });

    res.json(enrollments);
});

export { enrollCourse, getMyCourses };
