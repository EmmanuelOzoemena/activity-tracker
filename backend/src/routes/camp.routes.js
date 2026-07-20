const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  registerForCamp,
  getAllRegistrations,
} = require("../controllers/camp.controller.js");

const router = express.Router();

// Ensure uploads directory exists before saving files
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `receipt-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDF receipts are allowed!"), false);
    }
  },
});

// Routes
router.post("/register", upload.single("receipt"), registerForCamp);
router.get("/registrations", getAllRegistrations);

module.exports = router;
