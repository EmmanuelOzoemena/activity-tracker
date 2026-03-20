import React, { useState } from "react";
// import { registerForSkill } from "../services/skillService";
import { skillRegistration } from "../../apis/auth";
import { toast } from "react-toastify";
import { FiUploadCloud, FiCopy, FiCheck } from 'react-icons/fi'; 
import "./SkillRegistration.css";
import SuccessModal from "./SuccessModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [copied, setCopied] = useState(false);
  const accountNo = "2119341001";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo);
    setCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !dob ||
      !gender ||
      !skillType ||
      !phoneNumber ||
      !receipt
    ) {
      return toast.error("All fields are required");
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
        setRegisteredName(firstName);
        setIsModalOpen(true);

        // Clear form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setDob("");
        setGender("");
        setSkillType("");
        setPhoneNumber("");
        setReceipt(null);
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

        <form onSubmit={handleSubmit} className="skill-form" noValidate>
          <div className="input-group">
            <label className="field-label">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="e.g. Emmanuel"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="field-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="field-label">Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="field-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              // placeholder=""
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="field-label">Gender</label>
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
          </div>

          <div className="input-group">
            <label className="field-label">Phone Number</label>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="field-label">Skill to learn</label>

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
              <option value="Hair making">Hair making</option>
              <option value="Catering">Catering</option>
              <option value="Fashion design">Fashion design</option>
            </select>
          </div>

          <div className="payment-info-card">
            <h3>Payment Details</h3>
            <p className="amount-text">
              Registration Fee: <span>₦10,000</span>
            </p>

            <div className="account-details">
              <div className="detail-row">
                <span className="label">Bank:</span>
                <span className="value">UBA</span>
              </div>
              <div className="detail-row">
                <span className="label">Account Name:</span>
                <span className="value">
                  CATHOLIC CHURCH OF THE HOLY SPIRIT - DON BOSCO YOUTH CENTRE
                </span>
              </div>
              <div className="detail-row copy-row">
                <span className="label">Account Number:</span>
                <div className="copy-box" onClick={handleCopy}>
                  <span className="value">{accountNo}</span>
                  {copied ? (
                    <FiCheck className="copy-icon success" />
                  ) : (
                    <FiCopy className="copy-icon" />
                  )}
                </div>
              </div>
            </div>
          </div>

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

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={registeredName}
      />
    </div>
  );
};

export default SkillRegistration;
