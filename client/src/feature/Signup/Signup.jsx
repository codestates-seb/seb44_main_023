import React, { useState } from "react";
import { signupAPI } from "../../api/members";
import useSignupStore from "../../store/store.signup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { validation, setValidation } = useSignupStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signupAPI(email, password, nickname);

    try {
      console.log("회원가입 성공:", response);
      // 회원가입 성공 후에 필요한 추가 로직 구현
    } catch (error) {
      console.log("오류로 인한 회원가입 실패", error);
      // 에러 처리 등 추가 로직 구현
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

  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    let passwordValidation = "";

    // 비밀번호 유효성 검사
    if (!password) {
      passwordValidation = "비밀번호를 입력해주세요.";
    } else if (!isValidPassword(password)) {
      passwordValidation =
        "비밀번호는 영문 대소문자와 숫자의 조합으로 8자 이상이어야 합니다.";
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
    }

    // 유효성 검사에 통과하면 value를 저장
    // 유효성 검사 메세지 저장
    setValidation({ ...validation, nickname: nickNameValidation });
    setNickname(nickname);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/.test(password);
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <label>
          이메일:
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmailValidation}
          />
        </label>
        {validation.email && <p>{validation.email}</p>}
        <br />
        비밀번호:
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordValidation}
        />
        {validation.password && <p>{validation.password}</p>}
        <br />
        <label>
          닉네임:
          <input
            type="text"
            placeholder="Nick Name"
            onChange={handleNickNamelValidation}
          />
        </label>
        {validation.nickname && <p>{validation.nickname}</p>}
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;

