import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import smallLogo from "../../assets/home/smallLogo.svg";
import bigLogo from "../../assets/home/BigLogo.svg";
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
          <SmallLogo src={smallLogo}></SmallLogo>
          <WeatherWidget scale={0.95} />
        </MainHeader>
        <MainBody>
          <MainContents>
            <MainDivCol>
              <BigLogo src={bigLogo}></BigLogo>
              <SloganText>
                일정과 가계부를 한번에 관리할 수 있습니다.
              </SloganText>
            </MainDivCol>
            <MainDivRow>
              <Button
                label="Login"
                size="large"
                onClick={handleLoginButtonClick}
              />
              <Button
                label="Sign up"
                size="large"
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
  transition: all 0.3s ease; /* hover시 움직이는 애니메이션을 위한 transition 추가 */
  position: relative; /* hover시 움직이는 애니메이션을 위한 position 추가 */

  &:hover {
    transform: translateY(
      -5px
    ); 
  }
`;
const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`;
const BigLogo = styled.img`
  width: 38.8rem;
  height: 9.7rem;
`;
const SloganText = styled.div`
  margin-top: 2.5rem;
  font-size: 2rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
  font-weight: 600;
`;
const MainDivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 13.5rem;
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
  justify-content: space-between;
  align-items: center;
  padding-left: 7.2rem;
  padding-right: 3rem;

  height: 15%;
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
