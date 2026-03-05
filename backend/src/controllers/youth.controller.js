const Youth = require("../models/youth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new youth
const createYouth = async (req, res) => {
  try {
    const { name, email, password, dob, liturgicalGroup, gender, phoneNumber } =
      req.body;

    // Check if email already exists
    const existingYouth = await Youth.findOne({ email });

    if (existingYouth) {
      return res.status(400).json({
        message: "This email is already registered. Please login instead.",
      });
    }

    const youth = new Youth({
      name,
      email,
      password,
      dob,
      liturgicalGroup,
      gender,
      phoneNumber,
    });

    await youth.save();
    res.status(201).json(youth);
  } catch (error) {
    console.error("Error creating youth:", error);
    res.status(500).json({ error: "Failed to create youth" });
  }
};

// Login youth
const loginYouth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const youth = await Youth.findOne({ email });

    if (!youth) {
      return res.status(404).json({ error: "Youth not found" });
    }
    const isMatch = await bcrypt.compare(password, youth.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: youth._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token, youthId: youth._id });
    }
  } catch (error) {
    console.error("Error logging in youth:", error);
    res.status(500).json({ error: "Failed to log in youth" });
  }
};

// Get all youths
const allYouths = async (req, res) => {
  try {
    const youths = await Youth.find();
    res.status(200).json(youths);
  } catch (error) {
    console.error("Error fetching all youth:", error);
    res.status(500).json({ error: "Failed to fetch youths" });
  }
};

// Get a youth by ID
const getYouthById = async (req, res) => {
  try {
    const { id } = req.params;
    const youth = await Youth.findById(id);

    if (!youth) {
      return res.status(404).json({ error: "Youth not found" });
    }

    res.status(200).json(youth);
  } catch (error) {
    console.error("Error fetching youth by ID:", error);
    res.status(500).json({ error: "Failed to fetch youth" });
  }
};

// Delete a youth by ID
const deleteYouth = async (req, res) => {
  try {
    const { id } = req.params;
    const youth = await Youth.findByIdAndDelete(id);

    if (!youth) {
      return res.status(404).json({ error: "Youth not found" });
    }

    res.status(200).json({ message: "Youth deleted successfully" });
  } catch (error) {
    console.error("Error deleting youth:", error);
    res.status(500).json({ error: "Failed to delete youth" });
  }
};

// Update a youth by ID (optional, can be implemented later if needed)
const updateYouth = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, liturgicalGroup, gender, phoneNumber } = req.body;

    const updatedYouth = await Youth.findByIdAndUpdate(
      id,
      { name, dob, liturgicalGroup, gender, phoneNumber },
      { new: true },
    );

    if (!updatedYouth) {
      return res.status(404).json({ error: "Youth not found" });
    }

    res.status(200).json(updatedYouth);
  } catch (error) {
    console.error("Error updating youth:", error);
    res.status(500).json({ error: "Failed to update youth" });
  }
};

module.exports = {
  createYouth,
  loginYouth,
  allYouths,
  getYouthById,
  deleteYouth,
  updateYouth,
};
