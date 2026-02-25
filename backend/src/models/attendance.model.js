const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    youthId: {
      type: Schema.Types.ObjectId,
      ref: "Youth",
      required: true,
    },

    activityId: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "excused"],
      // default: "present", 
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

attendanceSchema.index({ youthId: 1, activityId: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;