import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "http://ec2-43-202-137-192.ap-northeast-2.compute.amazonaws.com:8080",
});
