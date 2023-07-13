import axios from "axios";

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`/api/auths`, { email, password });
    console.log(response.data);
    // accessToken
    const accessToken = response.headers.authorization;
    localStorage.setItem("accessToken", accessToken);

    // refreshToken
    const refreshToken = response.headers['x-refresh-token'];
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    throw new Error(error.response.error);
  }
};

export const signupAPI = async (email, password, nickname) => {
  try {
    const response = await axios.post(`/api/members`, {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};