import React, { useState } from "react";
// import { registerForSkill } from "../services/skillService";
import { skillRegistration } from "../../apis/auth";
import { toast } from "react-toastify";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import "./SkillRegistration.css";

const SkillRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [skillType, setSkillType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt) {
      return toast.error("Please upload a payment receipt");
    }

    setLoading(true);

    try {
      const registrationData = {
        firstName,
        lastName,
        email,
        dob,
        // gender,
        skillType,
        phoneNumber,
        receipt, 
      };

      const response = await skillRegistration(registrationData);

      if (response?.status === 201) {
        toast.success("Registration Successful!");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errorMsg);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skill-container">
      <div className="skill-card">
        <h2>Don Bosco Weekend Skills Registration</h2>
        {/* <p>Join us this Sunday to learn a new craft!</p> */}

        <form onSubmit={handleSubmit} className="skill-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="date"
            name="dob"
            // placeholder=""
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <select
            name="skillType"
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
            required
          >
            <option value="">Select a Skill</option>
            <option value="Web Designs">Web Designs</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Music">Music</option>
          </select>

          <div className="file-upload">
            <label htmlFor="receipt-upload" className="file-label">
              <FiUploadCloud className="upload-icon" />
              <span>{receipt ? receipt.name : "Upload Payment Receipt"}</span>
            </label>
            <input
              id="receipt-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Processing..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillRegistration;
