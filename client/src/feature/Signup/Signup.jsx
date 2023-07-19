import React, { useState } from "react";
import { signupAPI } from "../../api/members.api";
import useSignupStore from "../../store/store.signup";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Input from "../../components/Input/PageInput";
import Button from "../../components/Button/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { validation, setValidation } = useSignupStore();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isValidNickname(nickname)
    ) {
      alert("유효한 이메일, 비밀번호, 닉네임인지 확인해주세요.");
    }

    try {
      const response = await signupAPI(email, password, nickname);
      console.log("사용자 정보:", response);
      navigate("/login");
    } catch (error) {
      if (error === 409) {
        alert("이미 사용중인 이메일입니다.");
      } else if (error === 401) {
        alert("이미 사용중인 닉네임입니다.");
      } else {
        alert("관리자에게 문의하세요");
        navigate("*");
      }
    }
    // 자동으로 로그인 되어 메인으로 넘어가게끔 서버쪽 응답 헤더에 accessToken, refreshToken 보내달라고 요청하기
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
    // 유효성 검사에 통과하면 value를 저장
    setEmail(email);
  };

  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    let passwordValidation = "";

    // 비밀번호 유효성 검사
    if (!password) {
      passwordValidation = "비밀번호를 입력해주세요.";
    } else if (!isValidPassword(password)) {
      passwordValidation =
        "비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 포함하여 8자 이상 16자 이하여야 합니다.";
    }

    // 유효성 검사 메세지 저장
    setValidation({ ...validation, password: passwordValidation });
    // 유효성 검사에 통과하면 value를 저장
    setPassword(password);
  };

  const handleNickNamelValidation = (e) => {
    const nickname = e.target.value;
    let nickNameValidation = "";

    // 닉네임 유효성 검사
    if (!nickname) {
      nickNameValidation = "닉네임을 입력해주세요.";
    } else if (!isValidNickname(nickname)) {
      nickNameValidation = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.";
    }

    // 유효성 검사 메세지 저장
    setValidation({ ...validation, nickname: nickNameValidation });
    // 유효성 검사에 통과하면 value를 저장
    setNickname(nickname);
  };

  // 유효성 검사 정규식 서버랑 일치 시키기 위해 서버쪽 코드에서 따옴
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16}$/.test(password);
  };

  const isValidNickname = (nickname) => {
    return /^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$/.test(nickname);
  };

  const handleLoginLinkClick = () => {
    navigate("/login");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <>
      <InputBox>
        Email:
        <Input
          size={"32.4"}
          height={"4.8"}
          fontSize={"1.8"}
          type="email"
          placeholder="Email"
          onKeyDown={handleInputKeyDown}
          onChange={handleEmailValidation}
          info={validation.email}
        />
      </InputBox>
      <InputBox>
        Password:
        <Input
          width={32.4}
          size={"32.4"}
          height={"4.8"}
          fontSize={"1.8"}
          type="password"
          placeholder="Password"
          onKeyDown={handleInputKeyDown}
          onChange={handlePasswordValidation}
          info={validation.password}
        />
        {/* 비밀번호 보이기 버튼 */}
      </InputBox>
      <InputBox>
        Nick Name:
        <Input
          size={"32.4"}
          height={"4.8"}
          fontSize={"1.8"}
          type="text"
          placeholder="Nick Name"
          onKeyDown={handleInputKeyDown}
          onChange={handleNickNamelValidation}
          info={validation.nickname}
        />
      </InputBox>
      <Button
        type="submit"
        label="Sign Up"
        size="large"
        onClick={handleSignup}
        fontWeight={"600"}
      />
      <LoginLink onClick={handleLoginLinkClick}>
        이미 계정이 있으신가요? Login
      </LoginLink>
    </>
  );
};

export default Signup;

const InputBox = styled.div`
  text-align: left;
  font-size: 2.2rem;
  padding-bottom: 4rem;
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
