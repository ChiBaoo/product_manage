import axios from "axios";

export const http = axios.create({
  baseURL: "https://dummyjson.com",

  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
