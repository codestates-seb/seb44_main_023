import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    if (error.response) {
      if (error.response.status === 404) {
        alert("존재하지 않는 이메일입니다.");
        // navigate is not a function 오류 뜸
        // const navigate = useNavigate();
        // Hook call
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
    throw new Error(error.response.data.error);
  }
};
