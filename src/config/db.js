import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      ssl: process.env.MONGODB_SSL === 'true',
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MongoDB is running and credentials are correct');
    }
    process.exit(1);
  }
};