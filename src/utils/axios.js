import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASEURL;
console.log("API Base URL: ", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong",
    ),
);

export default axiosInstance;
