import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "http://ec2-3-35-11-50.ap-northeast-2.compute.amazonaws.com:8080",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
