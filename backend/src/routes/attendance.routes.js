const express = require("express");

const router = express.Router();

const {
  addAttendance,
  updateAttendance,
  allAttendances,
} = require("../controllers/attendance.controller");

router.get("/", allAttendances);
router.post("/", addAttendance);
router.put("/:id", updateAttendance);

module.exports = router;
