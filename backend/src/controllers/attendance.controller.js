const Attendance = require("../models/attendance.model");

// Add attendance for a youth in an activity
const addAttendance = async (req, res) => {
  try {
    const { youthId, activityId, status } = req.body;

    const attendance = new Attendance({
      youthId,
      activityId,
      status,
    });

    // If youthId or activityId is missing
    if (!youthId || !activityId) {
      return res
        .status(400)
        .json({ error: "Youth ID and Activity ID are required" });
    }

    // Validate attendance status
    if (!["present", "absent", "excused"].includes(status)) {
      return res.status(400).json({ error: "Invalid attendance status" });
    }

    // Check if attendance record already exists for the youth and activity
    const existingAttendance = await Attendance.findOne({
      youthId,
      activityId,
    });

    if (existingAttendance) {
      return res.status(400).json({
        error:
          "Attendance record already exists for this youth in this activity",
      });
    }

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ error: "Failed to add attendance" });
  }
};

// Get all attendance status
const allAttendances = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    // If status query exists, filter by it
    if (status) {
      filter.status = status;
    }

    const attendances = await Attendance.find()
      .populate("youthId")
      .populate("activityId");

    res.json(attendances);
  } catch (error) {
    console.error("Error fetching all attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};

// Update attendance for a youth in an activity
const updateAttendance = async (req, res) => {
  try {
    const { status, youthId, activityId } = req.body; // Get these from body instead of params

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { youth: youthId, activity: activityId }, // Find the record that matches both
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  addAttendance,
  updateAttendance,
  allAttendances,
};
