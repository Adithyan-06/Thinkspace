import axios from "axios";

const API = axios.create({
  baseURL: "https://thinkspace-u51i.onrender.com",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
