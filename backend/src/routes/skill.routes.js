const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");
const {
  registerSkill,
  getAllRegistrations,
} = require("../controllers/skill.controller");

// 'receipt' must match the name attribute in your frontend input
router.post("/", upload.single("receipt"), registerSkill);
router.get("/", getAllRegistrations);

module.exports = router;
