import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.user; // Get the JWT token from localStorage
    const responseObject = JSON.parse(user);
    const token = responseObject.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
