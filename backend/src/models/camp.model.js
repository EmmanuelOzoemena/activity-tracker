const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Child full name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Child age is required"],
    min: 1,
    max: 18,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  selectedActivities: [
    {
      type: String,
    },
  ],
  fee: {
    type: Number,
    required: true,
  },
});

const campRegistrationSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    children: [childSchema],
    totalFee: {
      type: Number,
      required: true,
    },
    receiptUrl: {
      type: String,
      required: [true, "Payment proof/receipt is required"],
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const CampRegistration = mongoose.model(
  "CampRegistration",
  campRegistrationSchema,
);
