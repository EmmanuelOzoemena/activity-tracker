import { useState } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  // Local state to hold form data
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "male",
    liturgicalGroup: "",
    phoneNumber: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data captured:", formData);
    alert("Ready for API integration!");
    // This is where you will add your fetch/axios POST request later
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Youth Registration</h2>
          <p>Fill in the details below to join the activity tracker.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ozoemena Chukwuebuka"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              placeholder="Enter date of birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Liturgical Group</label>
              <input
                type="text"
                name="liturgicalGroup"
                placeholder="e.g. Altar Servers"
                value={formData.liturgicalGroup}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="080XXXXXXXX"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Complete Registration
          </button>
          <Link to="/" className="cancel-btn">
            Back to Dashboard
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
