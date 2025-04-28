import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // our backend server
});

// Attach Authorization token automatically if exists
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
