const { getScore } = require("../utils/scoring");
const Activity = require("../models/activity.model");
const Youth = require("../models/youth.model");
const Attendance = require("../models/attendance.model");

// const

// Monthly stats
const getMonthlyStats = async (req, res) => {
  try {
    const { month, year } = req.query;

    // March
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    // All activities for that month
    const activities = await Activity.find({
      date: { $gte: start, $lt: end },
    });

    const totalActivities = activities.length;
    // possible score for that month
    const maxPossibleScore = totalActivities * 100;

    const youthList = await Youth.find();

    // Stats
    let stats = [];

    for (let youth of youthList) {
      // Attendance record
      const attendanceRecords = await Attendance.find({
        // youthId,
        // activityId,

        youthId: youth._id,
        activityId: { $in: activities.map((a) => a._id) },
      });

      // Accumulating the total points for each youth from attendance
      let totalPoints = 0;

      // for (let record of attendanceRecords) {
      //   if (record.status === "present") {
      //     totalPoints += 100;
      //   } else if (record.status === "excused") {
      //     totalPoints += 50;
      //   } else {
      //     totalPoints += 0;
      //   }
      // }
      for (let record of attendanceRecords) {
        totalPoints += getScore(record.status);
      }

      // Activeness Percentage
      const percentage =
        maxPossibleScore === 0
          ? 0
          : ((totalPoints / maxPossibleScore) * 100).toFixed(2);

      // Add to stats
      stats.push({
        name: youth.name,
        totalPoints,
        totalActivities,
        percentage: Number(percentage),
      });
    }

    stats.sort((a, b) => {
      b.percentage - a.percentage;
    });

    res.json(stats);
  } catch (error) {
    console.log("Error calculating monthly stats:", error);
    res.status(500).json({ error: "Failed to calculate stats" });
  }
};

module.exports = {
  getMonthlyStats,
};
