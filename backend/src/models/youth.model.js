const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const youthSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    liturgicalGroup: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      // default: true,
    },
  },

  {
    timestamps: true,
  },
);

const Youth = mongoose.model("Youth", youthSchema);

module.exports = Youth;
