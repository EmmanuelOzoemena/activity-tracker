import axios from "axios";

const API_BASE_URL = "http://localhost:3330";

// Register Youth
export const registerYouth = async (
  name,
  dob,
  gender,
  liturgicalGroup,
  phoneNumber,
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/youths`, {
      name,
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