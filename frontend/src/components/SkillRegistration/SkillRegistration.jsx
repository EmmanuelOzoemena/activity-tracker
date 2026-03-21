import React, { useState } from "react";
// import { registerForSkill } from "../services/skillService";
import { skillRegistration } from "../../apis/auth";
import { toast } from "react-toastify";
import { FiUploadCloud, FiCopy, FiCheck } from "react-icons/fi";
import "./SkillRegistration.css";
import SuccessModal from "./SuccessModal";

const SkillRegistration = () => {
  const [fullName, setFullName] = useState("");
  const [hasKids, setHasKids] = useState("No");
  const [kidsCount, setKidsCount] = useState("");
  const [isSponsoring, setIsSponsoring] = useState("No");
  const [sponsorCount, setSponsorCount] = useState("");
  const [skillType, setSkillType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [copied, setCopied] = useState(false);
  const accountNo = "2119341001";

  // Disable Skill Select if they are a Parent or a Sponsor
  const isGroupRegistration = hasKids === "Yes" || isSponsoring === "Yes";

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

    if (!fullName || !skillType || !phoneNumber || !receipt) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const registrationData = {
        fullName,
        skillType,
        phoneNumber,
        receipt,
      };

      const response = await skillRegistration(registrationData);

      if (response?.status === 201) {
        setRegisteredName(fullName);
        setIsModalOpen(true);

        // Clear form fields
        setFullName("");
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

        <form onSubmit={handleSubmit} className="skill-form">
          {/* Full Name */}
          <div className="input-group">
            <label className="field-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* WhatsApp Number */}
          <div className="input-group">
            <label className="field-label">Phone Number (WhatsApp)</label>
            <input
              type="text"
              placeholder="e.g. 08012345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Parent Question */}
          <div className="radio-section">
            <label className="field-label">
              Are you registering your children?
            </label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={hasKids === "Yes"}
                  onChange={() => setHasKids("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={hasKids === "No"}
                  onChange={() => {
                    setHasKids("No");
                    setKidsCount("");
                  }}
                />{" "}
                No
              </label>
            </div>
          </div>

          {hasKids === "Yes" && (
            <div className="input-group animate-in">
              <label className="field-label">How many children?</label>
              <input
                type="number"
                value={kidsCount}
                onChange={(e) => setKidsCount(e.target.value)}
                placeholder="Enter number of kids"
                required
              />
            </div>
          )}

          {/* Sponsor Question */}
          <div className="radio-section">
            <label className="field-label">
              Would you like to donate or sponsor a child?
            </label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={isSponsoring === "Yes"}
                  onChange={() => setIsSponsoring("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={isSponsoring === "No"}
                  onChange={() => {
                    setIsSponsoring("No");
                    setSponsorCount("");
                  }}
                />{" "}
                No
              </label>
            </div>
          </div>

          {isSponsoring === "Yes" && (
            <div className="input-group animate-in">
              <label className="field-label">
                How many children are you sponsoring?
              </label>
              <input
                type="number"
                value={sponsorCount}
                onChange={(e) => setSponsorCount(e.target.value)}
                placeholder="Enter number of children"
                required
              />
            </div>
          )}

          {/* Skill Selection - Disabled if Parent/Sponsor */}
          <div className="input-group">
            <label className="field-label">Skill to Learn</label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              disabled={isGroupRegistration}
              className={isGroupRegistration ? "disabled-input" : ""}
              required={!isGroupRegistration}
            >
              <option value="">
                {isGroupRegistration
                  ? "N/A (Group/Sponsor Payment)"
                  : "Select a Skill"}
              </option>
              <option value="Web Designs">Web Designs</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Music">Music</option>
            </select>
            {isGroupRegistration && (
              <small className="helper-text">
                Skill selection is disabled for group payments.
              </small>
            )}
          </div>

          {/* Payment Card Info */}
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

          {/* Upload payment */}
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
