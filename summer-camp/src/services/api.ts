import axios from "axios";

const API_BASE_URL = "https://api-activity-tracker.onrender.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
