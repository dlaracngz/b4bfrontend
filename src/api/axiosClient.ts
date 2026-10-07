import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://localhost:7157/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    config.headers["X-Tenant-Domain"] = window.location.hostname;
  }

  return config;
});
