import asyncHandler from 'express-async-handler';
import Course from '../models/courseModel.js';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).populate('instructor', 'name email');
    res.json(courses);
});

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');

    if (course) {
        res.json(course);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, price } = req.body;

    const course = new Course({
        title,
        description,
        category,
        price,
        instructor: req.user._id,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Instructor/Admin
const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, category, price } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
        // Check if user is instructor who created course or admin
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this course');
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.price = price !== undefined ? price : course.price;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to delete this course');
        }

        await Course.deleteOne({ _id: course._id });
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

export {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
