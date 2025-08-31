import express from "express";
import { uploadMedia } from '../middlewares/multer.middleware.js';
import uploadOnCloudinary from "../utils/image_handle/uploadOnCloudinary.js";
import cors from 'cors';
import envconf from "../../envconf.js";
import { DB_NAME } from "./constants.js";
import mongoose from "mongoose";
import { createChat, getAllChats, rewriteQuery, sendMessage, fetchMessages } from '../controllers/chat.controller.js';
import path from 'path';
import 'dotenv/config';
import { generateThumbnail } from "../../generateImage.js";
import dotenv from "dotenv";
import session from "express-session";

// dotenv.config();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env" });
}

const app = express();
app.use(cors({
    origin: 'https://ytthumbs-gamma.vercel.app', // React dev server URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(
  session({
    secret: "super_secret_key", // change in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true if https
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));


// @route   POST /api/upload
// @desc    Upload user image, convert to PNG, store on Cloudinary
// @access  Public (or protect if needed)
app.post("/api/upload", uploadMedia.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Pass multer's local temp path to Cloudinary uploader
        const uploadedFile = await uploadOnCloudinary(req.file.path);

        res.json({
            success: true,
            message: "Image uploaded successfully",
            url: uploadedFile.secure_url,
            public_id: uploadedFile.public_id, // useful for later deletion
        });
    } catch (error) {
        console.error("Upload route error:", error.message);
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message,
        });
    }
});

app.post("/api/chats/sendMessage", sendMessage);

app.post("/api/chats/createNewChat", createChat);

app.post("/api/chats/enhanceQuery", rewriteQuery)

app.get("/api/chats/getAllChats", getAllChats);

app.get("/api/chats/fetchMessages/:chatId", fetchMessages);

app.post("/api/chats/generateImage", async (req, res) => {
    try {
        const { imageUrl, promptText } = req.body;

        if (!imageUrl || !promptText) {
            return res.status(400).json({ success: false, message: "imageUrl and promptText are required" });
        }

        const result = await generateThumbnail(imageUrl, promptText);

        res.json({ success: true, cloudinaryUrl: result.cloudinaryUrl, localPath: result.localPath });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



async function startServer() {
    try {
        const port = process.env.PORT || envconf.backendPort || 5000
        await mongoose.connect(`${envconf.mongoDBuri}/${DB_NAME}`);
        console.log(`Connected to database: ${DB_NAME}`);

        app.listen(port, () => {
            console.log(`App is listening at port: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

startServer();

