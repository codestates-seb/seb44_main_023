import React, { useState } from "react";
import { loginAPI } from "../../api/members.api";
import useLoginStore from "../../store/store.login";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Input from "../../components/Input/PageInput";
import Button from "../../components/Button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = useLoginStore((state) => state.setLogin);
  const { validation, setValidation } = useLoginStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!isValidEmail(email) || !password) {
      // 유효성 검사를 통과하지 못한 경우 함수 실행 중단
      alert("유효한 이메일인지 확인해주세요.");
      return;
    }

    try {
      // 로그인 성공
      const res = await loginAPI(email, password);
      console.log("사용자 정보:", res);

      setLogin(true);
      setValidation("");

      navigate("/");
    } catch (error) {
      setValidation("로그인 실패");
      console.log(error);
      navigate("*");
    }
  };

  const handleEmailValidation = (e) => {
    const email = e.target.value;
    let emailValidationMSG = "";

    // 이메일 유효성 검사
    if (!email) {
      emailValidationMSG = "이메일을 입력해주세요.";
    } else if (!isValidEmail(email)) {
      emailValidationMSG = "유효한 이메일 형식이 아닙니다.";
    }

    // 유효성 검사 메세지 저장
    setValidation({ ...validation, email: emailValidationMSG });
    setEmail(email);
  };

  const isValidEmail = (email) => {
    // 이메일 유효성 검사 로직 작성
    // 유효한 이메일 형식인 경우 true 반환, 그렇지 않은 경우 false 반환
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    let passwordValidation = "";

    // 비밀번호 유효성 검사
    if (!password) {
      passwordValidation = "비밀번호를 입력해주세요.";
    }

    // 유효성 검사 메세지 저장
    setValidation({ ...validation, password: passwordValidation });
    setPassword(password);
  };

  const handleLoginLinkClick = () => {
    navigate("/signup");
  };

  // 등록된 계정이 아닐경우 status가 404면 존재하지 않는 회원입니다..?
  // 그럼 만약 비밀번호만 틀린경우 status가 다르게 뜨는지?

  return (
    <>
      <InputBox>
        Email:
        <Input
          size={"32.4rem"}
          height={"4.8rem"}
          fontSize={"1rem"}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailValidation}
        />
        {validation.email && <ValidMsg>{validation.email}</ValidMsg>}
      </InputBox>
      <InputBox>
        Password:
        <Input
          size={"32.4rem"}
          height={"4.8rem"}
          fontSize={"1rem"}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordValidation}
        />
        {validation.password && <ValidMsg>{validation.password}</ValidMsg>}
      </InputBox>
      <Button
        type="submit"
        label="Sign Up"
        size="large"
        onClick={handleLogin}
      />
      <LoginLink onClick={handleLoginLinkClick}>
        아직 회원이 아니신가요? Login
      </LoginLink>
    </>
  );
};

export default Login;

const InputBox = styled.div`
  text-align: left;
  font-size: 2.2rem;
  padding-bottom: 4rem;
`;

const ValidMsg = styled.p`
  width: 32.4rem;
  height: 4.8rem;
  text-align: left;
  font-size: 1.4rem;
  color: var(--color-red-01);
  word-wrap: break-word;
  padding-bottom: 3rem;
`;

const LoginLink = styled.a`
  display: block;
  margin-top: 2rem;
  text-align: center;
  color: var(--color-blue-03);
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
`;
