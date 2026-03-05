const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

    email: { 
      type: String, 
      required: true, 
      unique: true 
    },

    password: {
      type: String,
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

    phoneNumber: {
      type: String,
      // required: true,
    },

   role: {
    type: String,
    enum: ['youth', 'admin'],
    default: 'youth'
  }
  },

  {
    timestamps: true,
  },
);

youthSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // next();
});

const Youth = mongoose.model("Youth", youthSchema);

module.exports = Youth;
