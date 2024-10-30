import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Adjust the path as needed

const router = express.Router();

// POST /api/register - Register a new user
router.post('/register', registerUser);

// POST /api/login - Authenticate user and return a JWT token
router.post('/login', loginUser);

export default router;