import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";
import fs from "node:fs";
import cloudinary from "cloudinary";
import "dotenv/config";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generates a thumbnail using Gemini model from text and image.
 * @param {string} imageUrl - URL of the user's image
 * @param {string} promptText - Prompt for thumbnail generation
 * @returns {Promise<{ cloudinaryUrl: string, localPath: string }>}
 */
export async function generateThumbnail(imageUrl, promptText) {
  try {
    const ai = new GoogleGenAI({});

    // Fetch image and convert to base64
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Prepare Gemini prompt with text + image
    const prompt = [
      { text: promptText },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    let savedFilePath = null;
    let cloudinaryUrl = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");

        // Save locally
        savedFilePath = "public/temp/edited.png";
        fs.writeFileSync(savedFilePath, buffer);

        // Upload to Cloudinary
        const uploadRes = await cloudinary.v2.uploader.upload(savedFilePath, {
          folder: "yt_thumbnail_maker",
          use_filename: true,
        });

        cloudinaryUrl = uploadRes.secure_url;
      }
    }

    return { cloudinaryUrl, localPath: savedFilePath };
  } catch (err) {
    console.error("Error generating thumbnail:", err);
    throw err;
  }
}
