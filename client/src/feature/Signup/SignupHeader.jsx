import React, { useState } from "react";
// import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
/* 날씨 위젯 부분은 날씨 브랜치 fe-dev에 머지 후 작업 */

import styled from "styled-components";
import smallLogo from "../../assets/home/smallLogo.svg";

const SignupHeader = () => {
  return (
      <Header>
        <SmallLogo src={smallLogo}></SmallLogo>
        {/* <WeatherWidget scale={0.95} /> */}
      </Header>
  );
};

export default SignupHeader;

const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  padding-left: 7.2rem;
  padding-top: 1rem;
  width: 100%;
`;