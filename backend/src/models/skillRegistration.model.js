const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillRegistrationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    hasKids: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    kidsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isSponsoring: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

   sponsorCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    skillType: {
      type: String,
      default: "N/A", 
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
