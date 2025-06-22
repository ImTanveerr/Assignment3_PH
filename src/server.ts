import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const port = 5000;

async function main() {
   try {
        // Connect to MongoDB using the URI from .env
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('✅ MongoDB connected');

        // Start the server
        app.listen(port, () => {
            console.log(`🚀 Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
    }
}

main();