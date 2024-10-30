import Cart from '../Models/Cart.js' // Ensure you import your Cart model
import Product from '../Models/Product.js';
//import mongoose from 'mongoose';

// Add items to cart
export const addCartItem = async (req, res) => {
    //console.log("Request Body:", req.body); // Log request body
    //console.log("User ID:", req.user); // Log user information
  
    const { productId, qty } = req.body;
    const userId = req.user?.userId; // Adjust this based on the logged structure
  
    // Check for the required fields and log them
    //console.log("Product ID:", productId);
    //console.log("Quantity:", qty);
    //console.log("User ID:", userId);
  
    if (!productId || !qty || !userId) {
      return res
        .status(400)
        .json({ message: "Product ID, quantity, and user ID are required." });
    }
  
    if (qty <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero." });
    }
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const existingCartItem = await Cart.findOne({ userId, productId });
      if (existingCartItem) {
        return res
          .status(400)
          .json({ message: "Item already in cart. Please update the quantity." });
      }
  
      // Make sure to use the correct field for the quantity
      const newCartItem = new Cart({
        userId,
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: qty, // If your Cart model expects qty, keep this as is
      });
  
      await newCartItem.save();
      res
        .status(201)
        .json({ message: "successfully Added", newCartItem });
    } catch (error) {
      console.error("Error in addCartItem:", error); // Log the error for debugging
      return res
        .status(500)
        .json({ message: "Error adding item to cart", error: error.message });
    }
  };

 export const getUserCart = async (req, res) => {
    // Ensure that the user ID is retrieved correctly from req.user
    const userId = req.user?.userId; // Use userId if that's how it's stored in the JWT

    //console.log('User ID:', userId); // Log the user ID to check its value

    try {
        const cartItems = await Cart.find({ userId }); // Fetch cart items based on userId
        console.log('Retrieved cart items:', cartItems); // Log retrieved items for debugging

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error); // Log any error encountered
        res.status(500).json({ message: "Error fetching cart items", error: error.message });
    }
};
  
  // Update quantity in cart item
  export const updateCartItem = async (req, res) => {
    const { itemId } = req.params; // Extract the item ID from the route parameter
    const { qty } = req.body; // Get the new quantity from the request body

    //console.log("Updating cart item with ID:", itemId); // Debug logging

    try {
        // Ensure itemId is a valid ObjectId format, or just pass it directly if already validated
        const updatedItem = await Cart.findByIdAndUpdate(
            itemId, // Pass itemId directly; Mongoose handles ObjectId internally
            { qty }, // Update the quantity
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            //console.error("Cart item not found for ID:", itemId); // Log if not found
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Successfully updated
        res.status(200).json({ message: "Cart item updated successfully", updatedItem });
    } catch (error) {
        console.error("Error updating cart item:", error); // Log the error for debugging
        res.status(500).json({ message: "Error updating cart item", error: error.message });
    }
};
  
  // Delete items from cart using id
  export const removeCartItem = async (req, res) => {
    const { itemId } = req.params; // Extract the item ID from the route parameter

    //console.log("Attempting to remove cart item with ID:", itemId); // Debug logging

    try {
        // Ensure itemId is a valid ObjectId format; Mongoose will handle it internally
        const deletedItem = await Cart.findByIdAndDelete(itemId); // Use the Cart model to delete the item

        if (!deletedItem) {
            //console.error("Cart item not found for ID:", itemId); // Log if not found
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Successfully deleted
        res.status(200).json({ message: "Cart item removed successfully", deletedItem });
    } catch (error) {
        //console.error("Error removing cart item:", error); // Log the error for debugging
        res.status(500).json({ message: "Error removing cart item", error: error.message });
    }
};