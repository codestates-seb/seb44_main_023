import React, { useState } from "react";
import { loginAPI } from "../../api/members";
import useStore from "../../store/store.login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = useStore((state) => state.setLogin);
  const setValidation = useStore((state) => state.setValidation);
  // const setTokens = useStore((state) => state.setTokens);

  const handleLogin = async () => {
    try {
      // 유효성검사 로직 추가

      const response = await loginAPI(email, password);

      const user = response.find(
        (user) => user.email === email && user.password === password
      );

      // 응답 헤더에서 받아오기
      // 현재는 테스트 불가능
      const { accessToken, refreshToken } = response.header.authorization;

      if (user) {
        // 로그인 성공
        console.log("로그인 성공");
        console.log("사용자 정보:", user);

        setLogin(true);
        setValidation("");

        /* 로그인 성공 시 accessToken과 refreshToken을 localStorage에 저장 
        테스트 불가능 해서 일단 둠*/
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setTokens(accessToken, refreshToken);
      }
    } catch (error) {
      setValidation(error.message);
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
