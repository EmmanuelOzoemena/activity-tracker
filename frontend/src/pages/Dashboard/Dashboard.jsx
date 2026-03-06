import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { getYouthById } from "../../apis/auth";
import { toast } from "react-toastify";
import { getTotalStats } from "../../apis/auth";
import { FiUser } from "react-icons/fi"; // or FiUserCircle

const Dashboard = () => {
  // Mock data to visualize how your backend JSON will look in the UI
  const [rankings, setRankings] = useState([]);

  const [userBio, setUserBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBio = async () => {
      const savedId = localStorage.getItem("youthId");

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

    const fetchStats = async () => {
      // Get current month (1-12) and year
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      try {
        const response = await getTotalStats(currentMonth, currentYear);

        if (response?.status === 200) {
          // IMPORTANT: Your backend should return the list already sorted by points
          // If not, we can sort it here:
          const sortedData = response.data.sort(
            (a, b) => b.totalPoints - a.totalPoints,
          );
          setRankings(sortedData);
        }
      } catch (error) {
        console.error("Failed to fetch rankings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchUserBio();
  }, []);

  if (loading)
    return <div className="loading-state">Updating Leaderboard...</div>;

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      {userBio ? (
        <div className="profile-card bio-highlight">
          {/* <div className="avatar">✅</div> */}
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
      {/* User Profile Summary */}
      <section className="profile-section">
        <div className="profile-card">
          {/* <div className="avatar">👤</div> */}
          <div className="avatar-wrapper">
            <FiUser className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h2>Welcome back!</h2>
            <p>Check the leaderboard below to see your standing this month.</p>
          </div>
        </div>
      </section>
      {/* Leaderboard / Stats */}
      <section className="stats-section">
        <div className="section-header">
          <h3>Ranked Youth Activeness</h3>
          <span className="badge">
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getFullYear()}
          </span>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <span>Rank</span>
            <span>Name</span>
            <span>Points</span>
            <span>Activeness %</span>
          </div>

          {rankings.length > 0 ? (
            rankings.map((youth, index) => (
              <div className="table-row" key={youth.id || index}>
                <span className="rank-number">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </span>
                <span className="youth-name">{youth.name}</span>
                <span className="youth-points">{youth.totalPoints} pts</span>
                <span className="youth-percent">{youth.percentage}%</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No activity recorded for this month.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
