import { config } from 'dotenv';

// Load your environment variables from .env
config();

export const mongodbUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/easytravelex';

export const port = process.env.PORT || 3000;
