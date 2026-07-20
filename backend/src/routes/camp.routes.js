const express = require("express");
const upload = require("../config/cloudinary.js");

const {
  registerForCamp,
  getAllRegistrations,
} = require("../controllers/camp.controller.js");

const router = express.Router();

// Routes
router.post("/register", upload.single("receipt"), registerForCamp);
router.get("/registrations", getAllRegistrations);

module.exports = router;
