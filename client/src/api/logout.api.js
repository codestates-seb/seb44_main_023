import axios from 'axios';

const logout = async (accessToken) => {
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

export default logout;
