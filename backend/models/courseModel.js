import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a course title']
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        category: {
            type: String,
            required: [true, 'Please add a category']
        },
        price: {
            type: Number,
            required: [true, 'Please add a price']
        }
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
