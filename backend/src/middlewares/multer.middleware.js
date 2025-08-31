import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // temp storage before Cloudinary
    },
    filename: (req, file, cb) => {
        // safer unique filename (removes spaces + extension handled properly)
        const ext = path.extname(file.originalname); // keep original extension
        const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
        cb(null, `${Date.now()}-${baseName}${ext}`);
    },
});

// File filter (accept only images)
const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPG, PNG, WEBP allowed!"), false);
    }
};

// Multer middleware
export const uploadMedia = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10, files: 1 }, // 10MB limit for thumbnails
    fileFilter,
});
