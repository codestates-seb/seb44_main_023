import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`/api/auths`, { email, password });
    return response;
  } catch (error) {
    throw error.response.status;
  }
};


export const logout = async (accessToken) => {
  try {

    const response = await axios.delete("/api/logouts", {
      headers: {
        Authorization: accessToken,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.status;
  }
};