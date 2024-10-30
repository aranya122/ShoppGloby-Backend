import Product from "../Models/Product.js";// Ensure the correct path to your model

// GET /products: Fetch all products
export const getProducts = async(req, res) => {
    console.log('Fetching all products...');
    try {
        const products = await Product.find().lean();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /products/:id: Fetch product by ID
export const getProductById =async  (req, res) => {
    console.log(`Fetching product with ID: ${req.params.id}`);
    try {
        const product = await  Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
    const products = req.body; // This can now be either a single product or an array of products

    try {
        if (Array.isArray(products)) {
            // If the request body is an array, insert multiple products
            const newProducts = await Product.insertMany(products);
            return res.status(201).json(newProducts); // Return the created products
        } else {
            // If it's a single product, create it normally
            const newProduct = new Product(products);
            await newProduct.save();
            return res.status(201).json(newProduct); // Return the created product
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Server error' });
    }
};