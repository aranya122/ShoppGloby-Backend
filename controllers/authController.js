import bcrypt from 'bcrypt';
import User from '../Models/User.js'// Adjust the path as necessary
import { generateToken } from '../utlis/generateToken.js';// Adjust the path as necessary

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body; // Ensure you have username

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await 
        bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        //console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Authenticate user and return a JWT token
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
           // console.log("User not found"); // Log if user is not found
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await 
        bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPasswordValid); // Log password comparison result

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch (error) {
        //console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};