const SkillRegistration = require("../models/skillRegistration.model");

const registerSkill = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, skillType, phoneNumber } =
      req.body;

    // Multer-Cloudinary adds 'file' to the request object
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a payment receipt" });
    }

    const newRegistration = new SkillRegistration({
      firstName,
      lastName,
      email,
      dob,
      skillType,
      phoneNumber,
      paymentReceiptUrl: req.file.path, // The Cloudinary URL
      cloudinaryId: req.file.filename, // The ID for the image
    });

    await newRegistration.save();
    res
      .status(201)
      .json({ message: "Registration successful!", data: newRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await SkillRegistration.find();
    res.status(200).json({ data: registrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerSkill,
  getAllRegistrations,
};
