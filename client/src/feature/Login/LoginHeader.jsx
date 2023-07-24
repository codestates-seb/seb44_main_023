import React, { useState } from "react";
// import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
/* 날씨 위젯 부분은 날씨 브랜치 fe-dev에 머지 후 작업 */

import styled from "styled-components";
import headerLogo from "../../assets/logo/header_logo.png";

const SignupHeader = () => {
  return (
    <Header>
      <HeaderLogo src={headerLogo}></HeaderLogo>
      {/* <WeatherWidget scale={0.95} /> */}
    </Header>
  );
};

export default SignupHeader;

const HeaderLogo = styled.img`
  width: 18rem;
  cursor: pointer;
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  padding-left: 3rem;
  padding-top: 2rem;
  width: 100%;
`;
