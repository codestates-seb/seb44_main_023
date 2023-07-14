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

export const loginAPI = async (email, password, navigate) => {
  try {
    const response = await axios.post(`/api/auths`, { email, password });
    // console.log(response.data);
    // accessToken
    const accessToken = response.headers.authorization;
    localStorage.setItem("accessToken", accessToken);

    // refreshToken
    const refreshToken = response.headers["x-refresh-token"];
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        alert("존재하지 않는 이메일입니다.");
        // navigate is not a function 오류 뜸
        // const navigate = useNavigate();
        // Hook call 잘못됐다고 뜸 하지만 지금 작동은 함..
        navigate("/login");
      } else if (error.response.status === 401) {
        alert("비밀번호를 다시 확인해주세요.");
        navigate("/login");
      } else {
        alert("관리자에게 문의하세요");
        navigate("*");
      }
    } else {
      navigate("*");
      throw new Error(error.response.error);
    }
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
    console.log("오류로 인한 회원가입 실패", error);
    navigate("*");
    throw new Error(error.response.data.error);
  }
};
