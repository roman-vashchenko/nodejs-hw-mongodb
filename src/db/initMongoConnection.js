import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

async function initMongoConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Good`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error);
  }
}

export { initMongoConnection };
