import React, { useState } from "react";
import ButtonOauth from "../../components/Button/ButtonOauth";
import styled from "styled-components";

const OauthSignup = () => {
  // 소셜 로그인 구현 필요
  const handleGoogleClick = () => {
    alert("🚧공사중인 구글 회원가입입니다.");
  };
  const handleKakaoClick = () => {
    alert("🚧공사중인 카카오 회원가입입니다.");
  };
  const handleNaverClick = () => {
    alert("🚧공사중인 네이버 회원가입입니다.");
  };
  return (
    <Container>
      <ButtonOauth
        onGoogleClick={handleGoogleClick}
        onKakaoClick={handleKakaoClick}
        onNaverClick={handleNaverClick}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 4.4rem;
`;

export default OauthSignup;
