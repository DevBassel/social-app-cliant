import axios from "axios";
import { getToken } from "../utils/getToken";
import { APIURL } from "../utils/API.url";

export const axiosClient = axios.create({
  baseURL: `${APIURL}/api/v1`,
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
