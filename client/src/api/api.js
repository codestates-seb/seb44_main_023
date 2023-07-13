import axios from "axios";

export const API = axios.create({
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
