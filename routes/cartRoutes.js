import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {  addCartItem , getUserCart, updateCartItem, removeCartItem} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', authenticateJWT, getUserCart);

// Add to Cart
router.post('/add', authenticateJWT,  addCartItem );

// Update Cart Item
router.put('/update/:itemId', authenticateJWT,updateCartItem);

// Delete Cart Item
router.delete('/delete/:itemId', authenticateJWT, removeCartItem);




export default router;