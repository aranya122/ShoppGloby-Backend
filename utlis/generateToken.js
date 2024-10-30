
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Use an environment variable in production

// Function to generate JWT
export const generateToken = (userId) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '2h' });
};