import { API } from "./api";

export const readMemberInfo = async (memberId) => {
  try {
    const response = await API.get(`/api/members/${memberId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateMemberNickname = async (memberId, nickname) => {
  try {
    await API.patch(`/api/members/${memberId}/nickname`, {
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
    await API.patch(`/api/members/${memberId}/password`, {
      password,
      newPassword: newPassword,
    });
  } catch (err) {
    throw err;
  }
};

export const deleteMember = async (memberId, password) => {
  try {
    await API.delete(`/api/members/${memberId}?password=${password}`, {
      member_id: memberId,
      password,
    });
  } catch (err) {
    throw err;
  }
};

export const readProfileImage = async (memberId) => {
  try {
    const res = await API.get(`/api/members/${memberId}/profile-image`, {
      responseType: "blob",
    });
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    throw err;
  }
};
