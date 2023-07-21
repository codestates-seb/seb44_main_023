import { API } from "./api";
import Avatar from "../assets/userAvarta.png";

export const readMemberInfo = async (accessToken) => {
  try {
    const response = await API.get(`/members`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateMemberNickname = async (nickname) => {
  try {
    await API.patch(`/members/nickname`, {
      nickname,
    });
  } catch (err) {
    throw err;
  }
};

export const updateProfileImage = async (formData) => {
  try {
    await API.patch(`/members/profile-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (password, newPassword) => {
  try {
    await API.patch(`/members/password`, {
      password,
      newPassword: newPassword,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteMember = async (password) => {
  try {
    await API.delete(`/members?password=${password}`, {
      password,
    });
  } catch (err) {
    throw err;
  }
};

export const readProfileImage = async () => {
  try {
    const res = await API.get(`/members/profile-image`, {
      responseType: "blob",
    });
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    return Avatar;
  }
};

export const deleteProfileImage = async (memberId) => {
  try {
    await API.delete(`/members/${memberId}/profile-image`);
  } catch (err) {
    throw err;
  }
};

export const signupAPI = async (email, password, nickname) => {
  try {
    const response = await API.post(`/members`, {
      email,
      password,
      nickname,
    });
    return response;
  } catch (error) {
    throw error.response.status;
  }
};
