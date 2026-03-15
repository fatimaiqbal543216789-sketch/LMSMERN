import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'John Doe (Instructor)',
        email: 'john@example.com',
        password: 'password123',
        role: 'instructor',
    },
    {
        name: 'Jane Doe (Student)',
        email: 'jane@example.com',
        password: 'password123',
        role: 'student',
    },
];

export default users;
