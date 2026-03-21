const SkillRegistration = require("../models/skillRegistration.model");

const registerSkill = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      hasKids,
      kidsCount,
      isSponsoring,
      sponsorCount,
      skillType,
    } = req.body;

    // Multer-Cloudinary adds 'file' to the request object
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a payment receipt" });
    }

    const newRegistration = new SkillRegistration({
      fullName,
      phoneNumber,
      hasKids,
      // Convert to Number to ensure database consistency
      kidsCount: hasKids === "Yes" ? Number(kidsCount) : 0,
      isSponsoring,
      sponsorCount: isSponsoring === "Yes" ? Number(sponsorCount) : 0,
      // skillType will be saved as provided (or null/empty if group registration)
      skillType:
        hasKids === "Yes" || isSponsoring === "Yes"
          ? "Group/Sponsor"
          : skillType,
      paymentReceiptUrl: req.file.path,
      cloudinaryId: req.file.filename,
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
    // Sorting by newest first so to see the latest registrations at the top
    const registrations = await SkillRegistration.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ data: registrations });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerSkill,
  getAllRegistrations,
};
