import { API } from "./api";

export const readMemberInfo = async (memberId) => {
  try {
    const response = await API.get(`/members/${memberId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateMemberNickname = async (memberId, nickname) => {
  try {
    await API.patch(`/members/${memberId}/nickname`, {
      member_id: memberId,
      nickname,
    });
  } catch (err) {
    throw err;
  }
};

export const updateProfileImage = async (memberId, formData) => {
  try {
    await API.patch(
      `/members/${memberId}/profile-image?memberId=${memberId}`,
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
    await API.patch(`/members/${memberId}/password`, {
      password,
      newPassword: newPassword,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteMember = async (memberId, password) => {
  try {
    await API.delete(`/members/${memberId}?password=${password}`, {
      member_id: memberId,
      password,
    });
  } catch (err) {
    throw err;
  }
};

export const readProfileImage = async (memberId) => {
  try {
    const res = await API.get(`/members/${memberId}/profile-image`, {
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
