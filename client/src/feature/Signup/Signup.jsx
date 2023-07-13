import React, { useState } from "react";
import { signupAPI } from "../../api/members.api";
import useSignupStore from "../../store/store.signup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { validation, setValidation } = useSignupStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!isValidEmail(email) || !isValidPassword(password) || !isValidNickname(nickname)) {
       // 유효성 검사를 통과하지 못한 경우 함수 실행 중단
      alert("유효한 이메일, 비밀번호, 닉네임인지 확인해주세요.")
      return;
    }
    
    try {
      const response = await signupAPI(email, password, nickname);
      console.log("회원가입 성공:", response);
      // 자동으로 로그인 되어 메인으로 넘어가게끔 서버쪽 응답 헤더에 accessToken, refreshToken 보내달라고 요청하기
      navigate("/");
    } catch (error) {
      console.log("오류로 인한 회원가입 실패", error);
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

  return (
    <div>
      <h1>회원가입</h1>
      <form>
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
        <button type="submit" onClick={handleSignup}>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
