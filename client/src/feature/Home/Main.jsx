import React, { useState, useEffect,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import smallLogo from "../../assets/home/smallLogo.svg";
import bigLogo from "../../assets/home/BigLogo.svg";
import moveTo from "../../assets/home/moveTo.svg";
import Button from "../../components/Button/Button";

import WeatherWidget from '../../components/WeatherWidget/WeatherWidget';
import WeatherImage from './WeatherImage';

const Main = ({ onClick , weatherType}) => {
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
    const handleLoginButtonClick = () => {
      navigate("/login"); 
    };
    const handleSignUpButtonClick = () => {
      navigate("/signup"); 
    };
  
    return (
      <MainWrapper>
        <WeatherImage weatherType={weatherType} style={{zIndex:"-1"}}/>
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
                    style={{ display: "flex", marginTop: "5rem", justifyContent: "center", alignItem: "center" }}
                >
                    <MoveTo src={moveTo} onClick={onClick}></MoveTo>
                </div>
                </MainContents>
            </MainBody>
            </MainContainer>
      </MainWrapper>
    
    );
  };


  const MoveTo = styled.img`
  width: 6.4rem;
  height: 3.2rem;
`
const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`
const BigLogo = styled.img`
  width: 38.8rem;
  height: 9.7rem;
`
const SloganText = styled.div`
  margin-top:2.5rem;
  font-size: 2.0rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`
const MainDivRow= styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 13.5rem;
 `
const MainDivCol= styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`
const  MainContents= styled.div`
  display: flex;
  flex-direction : column;
  text-align: center;
  height: 60%;
`;

const MainContainer = styled.div`
  position:absolute;
  top:0rem;
  width:100%;
  height:100vh;
  background-position: center;

`;
const MainHeader = styled.div`
  position: relative;;
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-left:7.2rem ;
  height: 10%;
`;

const MainBody = styled.div`
  
  display: flex;
  justify-content:center;
  align-items: center;
  height: 90%;
`
const MainWrapper = styled.div`
  width:100%;
  height:100vh;
  background-position: center;
`


  export default Main;