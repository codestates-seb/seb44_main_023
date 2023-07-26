import { API } from "./api";

export const login = async (email, password) => {
  try {
    const response = await API.post(`/auths`, { email, password });
    return response;
  } catch (error) {
    throw error.response.status;
  }
};

export const logout = async (accessToken) => {
  try {
    const response = await API.delete("/logouts");
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.status;
  }
};
