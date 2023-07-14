import React, { useState, useEffect,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import smallLogo from "../../assets/home/smallLogo.svg";
import bigLogo from "../../assets/home/BigLogo.svg";
import moveUp from "../../assets/home/moveUp.svg";
import Button from "../../components/Button/Button";
import WeatherImage from './WeatherImage';
const DetailedPage = ({onClick, weatherType}) => {
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
    const handleLoginButtonClick = () => {
      navigate("/login"); 
    };
    const handleSignUpButtonClick = () => {
      navigate("/signup"); 
    };
  
    return (
      <DetailWarpper>
        <WeatherImage weatherType={weatherType} style={{zIndex:"-1"}}/>
        <DetailContainer>
          <DetailHeader>
            <SmallLogo src={smallLogo}></SmallLogo>
            <MoveUp src={moveUp} onClick={onClick} ></MoveUp>
            <div style={{width:"22rem"}}/>
          </DetailHeader>
            <DetailBody>
              <ContentsDiv>
               <Text> 서비스 상세 내용입니다. </Text>
              </ContentsDiv>
            </DetailBody>

        </DetailContainer>
      </DetailWarpper>
    
    );
  };



const MoveUp = styled.img`
  width: 6.4rem;
  height: 3.2rem;
`
const Text = styled.div`
  font-size: 2.0rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`
const DetailDivRow= styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 13.5rem;
 `
const DetailDivCol= styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`

const ContentsDiv=styled.div`
  width:85%;
  height: 85%;
  background: rgba(255, 255, 255, 0.4);
  padding : 2rem  2rem 2rem 2rem;
  border-radius: 3rem;

`
const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`

const DetailHeader = styled.div`
  position: relative;;
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-left:7.2rem ;
  height: 10%;
`;

const DetailBody = styled.div`
   display: flex;
  justify-content:center;
  align-items: center;
  height: 90%;

`
const DetailContainer = styled.div`
  position:absolute;
  top:100vh;
  width:100%;
  height:100vh;
  background-position: center;
  z-index:1;
`;

const DetailWarpper = styled.div`
  width:100%;
  background-position: center;
`


  export default DetailedPage;