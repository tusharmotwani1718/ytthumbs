import { v2 as cloudinary } from "cloudinary";
import { promises as fsPromises } from "fs";
import sharp from "sharp";
import envconf from "../../../envconf.js";

// Configure Cloudinary
cloudinary.config({
    cloud_name: envconf.cloudinaryCloudName,
    api_key: envconf.cloudinaryApiKey,
    api_secret: envconf.cloudinaryApiSecret,
});

// Function to upload files on Cloudinary (always as PNG)
const uploadOnCloudinary = async (localFilePath) => {
    let uploadedFile;
    const convertedFilePath = `converted_${Date.now()}.png`;

    try {
        if (!localFilePath) throw new Error("No file path provided");

        try {
            // Convert/resize to PNG
            await sharp(localFilePath)
                // .resize(1280, 720, { fit: "cover" }) 
                .png({ quality: 90 }) // ensure PNG format
                .toFile(convertedFilePath);

            // Upload converted file
            uploadedFile = await cloudinary.uploader.upload(convertedFilePath, {
                resource_type: "image",
                folder: "yt_thumbnail_maker",
                format: "png", // force png on cloudinary
            });
        } catch (convertError) {
            console.warn("Conversion failed, uploading original file:", convertError.message);

            // Upload original file (Cloudinary can auto-convert if needed)
            uploadedFile = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "image",
                folder: "yt_thumbnail_maker",
                format: "png", // enforce png output
            });
        }

        // Clean up local temp files
        await cleanupFiles([localFilePath, convertedFilePath]);

        if (!uploadedFile?.secure_url) throw new Error("Upload failed");

        return uploadedFile;
    } catch (error) {
        // Final cleanup fallback
        await cleanupFiles([localFilePath, convertedFilePath]);
        console.error("Cloudinary upload failed:", error.message);
        throw error;
    }
};

// Helper: delete files if they exist
const cleanupFiles = async (filePaths = []) => {
    for (const path of filePaths) {
        try {
            if (path && (await fsPromises.stat(path).catch(() => false))) {
                await fsPromises.unlink(path);
            }
        } catch (err) {
            console.warn(`Failed to delete file: ${path}`, err.message);
        }
    }
};

export default uploadOnCloudinary;
