import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerYouth } from "../../apis/auth";
import "./Registration.css";
import { toast } from "react-toastify";

const Registration = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [liturgicalGroup, setLiturgicalGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data captured:", {
      name,
      dob,
      gender,
      liturgicalGroup,
      phoneNumber,
    });

    if (!name || !dob || !gender || !liturgicalGroup || !phoneNumber) {
      return;
    }

    try {
      const response = await registerYouth(
        name,
        dob,
        gender,
        liturgicalGroup,
        phoneNumber,
      );

      if (response?.status === 201) {
        // alert("Registration Successful");

        const youthId = response.data._id || response.data.id;

        localStorage.setItem("youthId", youthId);

        toast.success("Registration Successful!");

        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(
          "Registration Failed. Please check your details and try again.",
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Registration error:", error);
    }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              placeholder="Enter date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={liturgicalGroup}
                onChange={(e) => setLiturgicalGroup(e.target.value)}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
