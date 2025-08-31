// envConf.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Enable __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

// Load .env only if running locally (not in Render)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(_dirname, '.env') });
} else {
  dotenv.config(); // fallback: use Render-injected vars
}

// Required vars (skip PORT because Render injects it automatically)
const requiredEnvVars = ['MONGODB_URI'];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Export config
const envConf = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  backendPort: process.env.PORT || 5000, // fallback for local dev
  mongoDBuri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

export default envConf;