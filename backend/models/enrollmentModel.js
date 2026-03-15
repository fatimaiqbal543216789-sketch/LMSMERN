import mongoose from 'mongoose';

const enrollmentSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        progress: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
