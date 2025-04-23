import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5041/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
