const express = require("express");
const multer = require("multer");

const {
  registerForCamp,
  getAllRegistrations,
} = require("./camp.controller.js");

const router = express.Router();

// Multer storage configuration for local receipt uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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

export default router;
