import axios from "axios";

export const readMemberInfo = async (memberId) => {
  try {
    const response = await axios.get(`/api/members/${memberId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateMemberNickname = async (memberId, nickname) => {
  try {
    await axios.patch(`/api/members/${memberId}/nickname`, {
      member_id: memberId,
      nickname,
    });
  } catch (err) {
    throw err;
  }
};

export const updateProfileImage = async (memberId, formData) => {
  try {
    await axios.patch(
      `/api/members/${memberId}/profile-image?memberId=${memberId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (memberId, password, newPassword) => {
  try {
    await axios.patch(`/api/members/${memberId}/password`, {
      password,
      newPassword: newPassword,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteMember = async (memberId, password) => {
  try {
    await axios.delete(`/api/members/${memberId}?password=${password}`, {
      member_id: memberId,
      password,
    });
  } catch (err) {
    throw err;
  }
};

export const readProfileImage = async (memberId) => {
  try {
    const res = await axios.get(`/api/members/${memberId}/profile-image`, {
      responseType: "blob",
    });
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    throw err;
  }
};

export const deleteProfileImage = async (memberId) => {
  try {
    await axios.delete(`/api/members/${memberId}/profile-image`);
  } catch (err) {
    throw err;
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`/api/auths`, { email, password });
    console.log(response.data);
    // accessToken
    const accessToken = response.headers.authorization;
    localStorage.setItem("accessToken", accessToken);

    // refreshToken
    const refreshToken = response.headers["x-refresh-token"];
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
