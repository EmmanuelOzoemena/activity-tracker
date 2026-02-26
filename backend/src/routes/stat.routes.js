const express = require("express");

const router = express.Router();

const { getMonthlyStats } = require("../controllers/stat.controller");

router.get("/monthly", getMonthlyStats);

module.exports = router;
