import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './data/users.js';
import courses from './data/courses.js';
import User from './models/userModel.js';
import Course from './models/courseModel.js';
import Enrollment from './models/enrollmentModel.js';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const importData = async () => {
    try {
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const createdUser = await User.create(user);
            createdUsers.push(createdUser);
        }

        const instructorUser = createdUsers[1]._id; // The instructor user from our dummy array

        const sampleCourses = courses.map((course) => {
            return { ...course, instructor: instructorUser };
        });

        await Course.insertMany(sampleCourses);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Enrollment.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
