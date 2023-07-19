import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "https://api.planfinity.co.kr",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
