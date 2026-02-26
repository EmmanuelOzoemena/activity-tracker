import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { getYouthById } from "../../apis/auth";
import { toast } from "react-toastify";

const Dashboard = () => {
  // Mock data to visualize how your backend JSON will look in the UI
  const [rankings] = useState([
    {
      name: "Ozoemena Chukwuebuka",
      totalPoints: 100,
      totalActivities: 2,
      percentage: 50,
    },

    {
      name: "Ibeh Chioma",
      totalPoints: 400,
      totalActivities: 4,
      percentage: 100,
    },

    {
      name: "Raphael Anthony",
      totalPoints: 100,
      totalActivities: 2,
      percentage: 75,
    },

    { name: "Olije Abel", totalPoints: 0, totalActivities: 2, percentage: 0 },
  ]);

  const [userBio, setUserBio] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchUserBio = async () => {
      const savedId = localStorage.getItem('youthId');
      
      if (!savedId) {
        setLoading(false);
        return; 
      }

      try {
        const response = await getYouthById(savedId);

        if (response?.status === 200) {
          setUserBio(response.data); // Assuming response.data contains the youth object
        } else {
          console.error("User not found in database");
          // Optional: Clear storage if ID is invalid/expired
          // localStorage.removeItem('currentYouthId');
        }
      } catch (error) {
        toast.error("Failed to load your profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBio();
  }, []); 

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      {userBio ? (
        <div className="profile-card bio-highlight">
          <div className="avatar">✅</div>
          <div className="profile-info">
            <h2>Hi, {userBio.name}!</h2>
            {/* <p>Your ID: {userBio._id}</p> */}
            <p>Gender: {userBio.gender}</p>
            <p>Liturgical Group: {userBio.liturgicalGroup}</p>
            <p>Phone Number: {userBio.phoneNumber}</p>
          </div>
        </div>
      ) : (
        <div className="registration-banner">
          <div className="banner-text">
            <h3>Are you a first-timer?</h3>
            <p>Register now to start tracking your church activity points!</p>
          </div>
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      )}

      ;{/* 2. User Profile Summary */}
      <section className="profile-section">
        <div className="profile-card">
          <div className="avatar">👤</div>
          <div className="profile-info">
            <h2>Welcome back!</h2>
            <p>Check the leaderboard below to see your standing this month.</p>
          </div>
        </div>
      </section>

      {/* 3. Leaderboard / Stats */}
      <section className="stats-section">
        <div className="section-header">
          <h3>Ranked Animators Activeness</h3>
          <span className="badge">Monthly Stats</span>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <span>Rank</span>
            <span>Name</span>
            <span>Points</span>
            <span>Activity %</span>
          </div>

          {rankings.map((youth, index) => (
            <div className="table-row" key={index}>
              <span className="rank-number">#{index + 1}</span>
              <span className="youth-name">{youth.name}</span>
              <span className="youth-points">{youth.totalPoints} pts</span>
              <span className="youth-percent">{youth.percentage}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
