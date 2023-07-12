import axios from 'axios';
// 임시 URL
const BASE_URL = 'http://localhost:5173/src/moks';

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user.json`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signupAPI = async (email, password, nickname) => {
  try {
    const response = await axios.post(`/api/signup`, {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};