import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets//logo/header_logo.png";

const SignupHeader = () => {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  }; 

  return (
    <Header>
      <HeaderLogo src={headerLogo} onClick={handleLogoClick}></HeaderLogo>
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