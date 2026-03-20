import axios from "axios";

const API_BASE_URL = "https://api-activity-tracker.onrender.com";

// Register Youth
export const registerYouth = async (
  name,
  email,
  password,
  dob,
  gender,
  liturgicalGroup,
  phoneNumber,
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/youths`, {
      name,
      email,
      password,
      dob,
      gender,
      liturgicalGroup,
      phoneNumber,
    });

    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

// Login Youth
export const loginYouth = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/youths/login`, {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token); // Save token for future requests
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info
    }
    return res;
  } catch (error) {
    return error.response;
  }
};

// Register for a skill
export const skillRegistration = async (data) => {
  try {
    // Create FormData instance
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    // formData.append("gender", data.gender);
    formData.append("skillType", data.skillType);
    formData.append("phoneNumber", data.phoneNumber);
    // Append the file (The key 'receipt' must match upload.single('receipt') on backend)
    formData.append("receipt", data.receipt);

    const res = await axios.post(`https://api-activity-tracker.onrender.com/skill`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    return error.message;
  }
};

// Get all skill registration details
export const getAllRegistrations = async () => {
  try {
    const res = await axios.get(`https://api-activity-tracker.onrender.com/skill`);
  
    return Array.isArray(res.data) ? res.data : res.data.data; 
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; 
  }
};

// Get a single youth by ID
export const getYouthById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/youths/${id}`);
    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

// Get all youths
export const getAllYouths = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/youths`);
    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

// Create activity
export const createActivity = async (title, description, date) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/activities`, {
      title,
      description,
      date,
    });
    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

// Get activity by ID (Not Used)
export const getActivityById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/activities/${id}`);
    return res;
  } catch (error) {
    console.error("ERROR fetching activity by ID:", error);
    return error?.response;
  }
};

// Get all activities
export const getActivities = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/activities`);
    return res;
  } catch (error) {
    console.error("ERROR fetching all activities:", error);
    return error?.response;
  }
};

// Add/Mark attendance for a youth in an activity
export const markAttendance = async (youthId, activityId, status) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/attendance`, {
      youthId,
      activityId,
      status,
    });
    return res;
  } catch (error) {
    console.error("ERROR marking attendance:", error);
    return error?.response;
  }
};

// Update attendance status for a youth in an
export const updateAttendance = async (id, status) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/attendance/${id}`, { status });
    return res;
  } catch (error) {
    console.error("ERROR updating attendance:", error);
    return error?.response;
  }
};

// Stats calculation for a given month and year
export const getTotalStats = async (month, year) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/stats/monthly`, {
      params: { month, year },
    });
    return res;
  } catch (error) {
    console.error("ERROR fetching monthly stats:", error);
    return error?.response;
  }
};
