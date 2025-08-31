// envConf.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Ensure __dirname works in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file explicitly
const result = dotenv.config({ path: path.join(__dirname, '.env') });

if (result.error) {
  throw new Error(`Failed to load .env file: ${result.error}`);
}

// Check for missing environment variables
const requiredEnvVars = ['OPENAI_API_KEY', 'GEMINI_API_KEY', 'PORT', 'MONGODB_URI'];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Export configuration safely
const envConf = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  backendPort: process.env.PORT,
  mongoDBuri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN
};

export default envConf;
