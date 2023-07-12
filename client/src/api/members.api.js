import { API } from "./api";

export const readMemberInfo = async (memberId) => {
  try {
    const response = await API.get(`/api/members/${memberId}`);
    return response.data;
  } catch (err) {
    return [];
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
    await API.post(`/members/${memberId}/password`, {
      member_id: memberId,
      password,
      new_password: newPassword,
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
