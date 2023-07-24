import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : "https://api.planfinity.co.kr/",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUB0ZXN0LmNvbSIsImV4cCI6MTY5MDI0NTMyMSwiaWF0IjoxNjkwMTU4OTIxLCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwibWVtYmVySWQiOiIxIn0.LxRAl88limpHVGs_G9sW2BRnWR5VrxRncMXj7Dt12oU",
  },
});
