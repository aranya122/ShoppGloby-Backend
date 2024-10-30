import express from 'express'
import {getProducts,getProductById,createProduct} from '../controllers/productController.js'

const router = express.Router();

router.get('/', getProducts); // Route to get all products

router.get('/:id', getProductById); // Route to get a product by ID

router.post('/', (req, res, next) => {
    console.log('POST request to /products received:', req.body); // Log the request body
    next(); // Proceed to the createProduct function
}, createProduct);


export default router;