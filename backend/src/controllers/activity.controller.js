const Activity = require("../models/activity.model")

// Add an activity
const addActivity = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const activity = new Activity({ title, description, date });
    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ error: "Failed to add activity" });
  }
}

// Get all activities
const allActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
}

// Get an activity by ID
const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id); 

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
}

module.exports = {
  addActivity,
  allActivities ,
  getActivityById,
};