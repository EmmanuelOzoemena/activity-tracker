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
  },
  
  { 
    timestamps: true 
  },
);

const Youth = mongoose.model("Youth", youthSchema);

module.exports = Youth;
