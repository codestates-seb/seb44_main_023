import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import homeLogo from "../../assets/logo/home_logo.png";
import Button from "../../components/Button/Button";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import { IoIosArrowDown } from "react-icons/io";

const Intro = ({ onClick }) => {
  const navigate = useNavigate();
  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  return (
    <MainWrapper>
      <MainContainer>
        <MainHeader>
          <WeatherWidget scale={0.95} />
        </MainHeader>
        <MainBody>
          <MainContents>
            <MainDivCol>
              <HomeLogo src={homeLogo}></HomeLogo>
            </MainDivCol>
            <MainDivRow>
              <Button
                label="Login"
                size="large"
                hovercolor={"var(--color-blue-05)"}
                onClick={handleLoginButtonClick}
              />
              <Button
                label="Sign up"
                size="large"
                hovercolor={"var(--color-blue-05)"}
                onClick={handleSignUpButtonClick}
              />
            </MainDivRow>
            <div
              style={{
                display: "flex",
                marginTop: "5rem",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <MoveTo onClick={onClick}></MoveTo>
            </div>
          </MainContents>
        </MainBody>
      </MainContainer>
    </MainWrapper>
  );
};

const MoveTo = styled(IoIosArrowDown)`
  margin-top: 4rem;
  width: 8rem;
  height: 9rem;
  color: white;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HomeLogo = styled.img`
  width: 32rem;
`;

const MainDivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12rem;
  width: 45rem;
`;

const MainDivCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 80%;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-position: center;
`;

const MainHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 3rem;
  padding-right: 1rem;
`;

const MainBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Intro;