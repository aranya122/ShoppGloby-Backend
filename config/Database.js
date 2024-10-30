import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const url = process.env.URL; // Use the environment variable

 export const dbConnect = () => {
  mongoose.connect(url)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.log("Issue in Connecting", err); // Log the actual error
    });
}

export default dbConnect;