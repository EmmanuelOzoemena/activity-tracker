const Youth = require("../models/youth.model");

// Create a new youth
const createYouth = async (req, res) => {
  try {
    const { name, dob, liturgicalGroup } = req.body;

    const youth = new Youth({ name, dob, liturgicalGroup });
    await youth.save();
    res.status(201).json(youth);
  } catch (error) {
    console.error("Error creating youth:", error);
    res.status(500).json({ error: "Failed to create youth" });
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
    const { name, dob, liturgicalGroup } = req.body;

    const updatedYouth = await Youth.findByIdAndUpdate(
      id,
      { name, dob, liturgicalGroup },
      { new: true }
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
  allYouths,
  getYouthById,
  deleteYouth,
  updateYouth,
};
