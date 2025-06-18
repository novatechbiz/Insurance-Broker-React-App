import axios from "axios";
import { BASE_API_URL } from "configs/url.config";

//const BASE_URL = process.env.REACT_APP_API_BASEURL;
const BASE_URL = BASE_API_URL;

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
