import React, { useState } from "react";
import ButtonOauth from "../../components/Button/ButtonOauth";
import styled from "styled-components";

const OauthSignup = () => {
  // 소셜 로그인 구현 필요
  return (
    <Container>
      <ButtonOauth />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 4.4rem;
`;

export default OauthSignup;
