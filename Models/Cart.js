import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product', // Assuming you have a Product model
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1, // Ensure that quantity is at least 1
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Cart = mongoose.model('Cart', cartItemSchema);

export default Cart;