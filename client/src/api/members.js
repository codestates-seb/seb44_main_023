import axios from "axios";
// 임시 URL
const BASE_URL = "https://53d4-180-230-249-174.ngrok-free.app";

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auths`, { email, password });
    console.log(response.data);
    const accessToken = response.headers.authorization;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.error);
  }
};

export const signupAPI = async (email, password, nickname) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};