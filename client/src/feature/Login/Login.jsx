import React, { useState } from "react";
import { loginAPI } from "../../api/members";
import useLoginStore from "../../store/store.login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = useLoginStore((state) => state.setLogin);
  const setValidation = useLoginStore((state) => state.setValidation);
  // const setTokens = useLoginStore((state) => state.setTokens);

  const handleLogin = async () => {
    try {
      // 유효성검사 로직 추가

      const response = await loginAPI(email, password);

      const user = response.email === email && response.password === password;

      // 응답 헤더에서 받아오기
      const { accessToken, refreshToken } = response.header.authorization;

      if (user) {
        // 로그인 성공
        console.log("로그인 성공");
        console.log("사용자 정보:", user);

        setLogin(true);
        setValidation("");

        /* 로그인 성공 시 accessToken과 refreshToken을 localStorage에 저장 
        테스트 불가능 해서 일단 둠*/
        localStorage.setItem("accessToken", accessToken , "refreshToken" , refreshToken);

        useNavigate("/");
      }
    } catch (error) {
      setValidation("로그인 실패");
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
