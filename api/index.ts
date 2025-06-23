import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from '../src/app';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // return immediately if already connected
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');
  await mongoose.connect(process.env.MONGODB_URI, {
    // optional options for better connection management
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  isConnected = true;
  console.log('MongoDB connected');
};

const handler = serverless(app);

export default async (req: any, res: any) => {
  try {
    await connectDB();
    return handler(req, res);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).send('Internal Server Error');
  }
};
