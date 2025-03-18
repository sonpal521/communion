

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Time to wait before error
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      });

    cached.conn = await cached.promise;
    console.log(' MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    console.error(' MongoDB connection failed:', error);
    throw new Error('MongoDB connection failed');
  }
};
