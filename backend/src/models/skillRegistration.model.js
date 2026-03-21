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
      default: "No",
    },

    kidsCount: {
      type: String,
      default: 0,
    },

    isSponsoring: {
      type: String,
      default: "No",
    },

    sponsorCount: {
      type: Number,
      default: 0,
    },

    skillType: {
      type: String,
      required: true,
      enum: [
        "Web Designs",
        "UI/UX Design",
        "Music",
        "Hair making",
        "Catering",
        "Fashion design",
      ],
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
