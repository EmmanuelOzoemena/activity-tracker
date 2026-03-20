const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillRegistrationSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    skillType: {
      type: String,
      required: true,
      enum: ["Web Designs", "UI/UX Design", "Music", "Hair making", "Catering", "Fashion design"],
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    paymentReceiptUrl: {
      type: String,
      required: true,
    }, // Cloudinary URL

    cloudinaryId: {
      type: String,
      required: true,
    }, // To delete/manage image later

    status: {
      type: String,
      default: "Pending",
    }, // Pending, Verified, Rejected
  },
  { timestamps: true },
);

const SkillRegistration = mongoose.model(
  "SkillRegistration",
  skillRegistrationSchema,
);

module.exports = SkillRegistration;
