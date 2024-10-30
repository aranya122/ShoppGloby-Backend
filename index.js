import express from 'express';
import dotenv from 'dotenv';
import {dbConnect} from './config/Database.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import bodyParser from 'body-parser'

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
//app.use(express.json()); 

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// Example route using the protect middleware
//pp.get('/api/protect', protect, (req, res) => {
  //res.json({ message: 'This is a protected route', user: req.user });
//});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes

app.use('/api/products', productRoutes); // Product routes
app.use('/api/cart/', cartRoutes); // Cart routes, protected by auth middleware

// Error handling middleware
app.use(errorHandler);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server

const PORT = process.env.PORT|| 8000; // Use port from environment variable or default to 8000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`); // Log the server start message
});
//connect to MongoDB
dbConnect();

export default app