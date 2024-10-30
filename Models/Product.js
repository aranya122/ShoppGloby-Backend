import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String 
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
},{
    timestamps:true
});

export default mongoose.model('Product', productSchema);