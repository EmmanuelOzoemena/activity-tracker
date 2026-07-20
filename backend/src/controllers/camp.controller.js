const { CampRegistration } = require("../models/camp.model.js");

/**
 * @desc   Register children for Summer Camp
 * @route  POST /api/camp/register
 * @access Public
 */
const registerForCamp = async (req, res) => {
  try {
    const { parentName, phone, whatsapp, email, address, children } = req.body;

    // 1. Basic validation
    if (!parentName || !phone || !email || !children) {
      return res.status(400).json({
        message: "Please provide all required parent and child fields.",
      });
    }

    // Ensure children data exists
    const parsedChildren =
      typeof children === "string" ? JSON.parse(children) : children;

    if (!Array.isArray(parsedChildren) || parsedChildren.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one child must be registered." });
    }

    // 2. Validate payment receipt file upload
    if (!req.file) {
      return res.status(400).json({ message: "Payment receipt is required." });
    }

    // Receipt URL path
    const receiptUrl = req.file.path || `/uploads/${req.file.filename}`;

    // 3. Calculate fees server-side based on flyer logic
    let totalFee = 0;
    const processedChildren = parsedChildren.map((child) => {
      const fee = child.age < 6 ? 30000 : 10000;
      totalFee += fee;
      return {
        ...child,
        fee,
      };
    });

    // 4. Save to Database
    const registration = await CampRegistration.create({
      parentName,
      phone,
      whatsapp,
      email,
      address,
      children: processedChildren,
      totalFee,
      receiptUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully!",
      data: registration,
    });
  } catch (error) {
    console.error("Camp Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process registration.",
      error: error.message,
    });
  }
};

/**
 * @desc   Get all camp registrations (for Admin Dashboard)
 * @route  GET /api/camp/registrations
 * @access Private / Admin
 */
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await CampRegistration.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching registrations",
      error: error.message,
    });
  }
};

module.exports = {
  registerForCamp,
  getAllRegistrations,
};
