const express = require("express");

const router = express.Router();

const {
  createYouth,
  allYouths,
  getYouthById, 
  deleteYouth,
  updateYouth,
} = require("../controllers/youth.controller");

router.post("/", createYouth); // to create a youth
router.get("/", allYouths); // to get all youths
router.get("/:id", getYouthById); // to get a youth by ID
router.delete("/:id", deleteYouth); // to delete a youth by ID
router.put("/:id", updateYouth); // to update a youth by ID

module.exports = router;
