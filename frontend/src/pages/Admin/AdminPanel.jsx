import { useState, useEffect } from "react";
import "./AdminPanel.css";
import { toast } from "react-toastify";
import {
  getAllYouths,
  createActivity,
  getActivities,
  markAttendance,
  updateAttendance,
} from "../../apis/auth";

const AdminPanel = () => {
  // States for creating activity
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [currentActivity, setCurrentActivity] = useState(null);
  const [markedStatus, setMarkedStatus] = useState({});

  // State for fetching youth
  const [youths, setYouths] = useState([]);

  //  Handle Activity Creation
  const handleCreateActivity = async (e) => {
    e.preventDefault();
    const response = await createActivity(title, description, date);

    if (response?.status === 201) {
      toast.success("New Activity Created!");

      // Immediately updates the table rows with the new activity
      setCurrentActivity(response.data);
      setTitle("");
      setDescription("");
      setDate("");
    } else {
      toast.error("Failed to create activity.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      // 'en-GB' gives DD/MM/YYYY
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle Attendance Marking
  const handleAttendanceAction = async (youthId, status) => {
    if (!currentActivity) {
      toast.error("Please select or create an activity first!");
      return;
    }

    const activityId = currentActivity._id;
    const existingStatus = markedStatus[youthId];

    try {
      let response;

      if (existingStatus) {
        // If they already have a status in our state, we UPDATE (PUT)
        response = await updateAttendance(status);
      } else {
        // If they are fresh, we MARK (POST)
        response = await markAttendance(youthId, activityId, status);
      }

      if (response?.status === 200 || response?.status === 201) {
        // Update local state so the UI buttons change color
        setMarkedStatus((prev) => ({
          ...prev,
          [youthId]: status,
        }));
        toast.success(`Marked as ${status}`);
      }
    } catch (error) {
      console.error("Attendance Error:", error);
      toast.error("Failed to save attendance.");
    }
  };

  useEffect(() => {
    const fetchYouths = async () => {
      try {
        const response = await getAllYouths();

        if (response?.status === 200) {
          setYouths(response.data);
        } else {
          console.error("Failed to fetch youths from database ");
        }
      } catch (error) {
        toast.error("Failed to load your profile details.");
        console.error("Error fetching youths:", error);
      }
    };

    const initAdminData = async () => {
      try {
        // Fetch all activities
        const activityRes = await getActivities();
        if (activityRes?.status === 200 && activityRes.data.length > 0) {
          // Set the very last activity created as the "Current" one
          const latest = activityRes.data[activityRes.data.length - 1];
          setCurrentActivity(latest);
        }

        // Fetch all youths for the table
        fetchYouths();
      } catch (error) {
        console.error("Error initializing admin panel:", error);
      }
    };

    initAdminData();
  }, []);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Control Panel</h1>
      </header>

      {/* CREATE ACTIVITY */}
      <section className="admin-card">
        <h2>Set New Activity</h2>
        <form onSubmit={handleCreateActivity} className="activity-form">
          <input
            type="text"
            placeholder="Activity Title (e.g., Oratory)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="create-btn">
            Create Activity
          </button>
        </form>
      </section>

      {/* SECTION 2: ATTENDANCE TABLE */}
      <section className="admin-card">
        <h2>Mark Attendance</h2>

        {!currentActivity ? (
          <p className="notice">
            Please create or select an activity to start marking attendance.
          </p>
        ) : (
          <div className="active-session-info">
            <strong>Marking for:</strong> {currentActivity.title} (
            {formatDate(currentActivity.date)})
          </div>
        )}

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Activity</th>
                <th>Activity Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {youths.map((youth) => {
                const currentStatus = markedStatus[youth._id]; // Get status for this specific youth

                return (
                  <tr key={youth._id}>
                    <td>{youth.name}</td>
                    <td>{currentActivity?.title}</td>

                    <td className="status-btns">
                      <button
                        className={`btn-present ${currentStatus === "present" ? "active" : ""}`}
                        onClick={() =>
                          handleAttendanceAction(youth._id, "present")
                        }
                      >
                        Present
                      </button>

                      <button
                        className={`btn-excused ${currentStatus === "excused" ? "active" : ""}`}
                        onClick={() =>
                          handleAttendanceAction(youth._id, "excused")
                        }
                      >
                        Excused
                      </button>

                      <button
                        className={`btn-absent ${currentStatus === "absent" ? "active" : ""}`}
                        onClick={() =>
                          handleAttendanceAction(youth._id, "absent")
                        }
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
