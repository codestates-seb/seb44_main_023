import React, { useState, useEffect,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import smallLogo from "../assets/home/smallLogo.svg";
import bigLogo from "../assets/home/BigLogo.svg";
import moveTo from "../assets/home/moveTo.svg";
import "../index.css";

import Main from '../feature/Home/Main';
import DetailedPage from '../feature/Home/DetailedPage';
import { useGetWeatherInfo } from '../store/store.weather';
import Button from "../components/Button/Button";


const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const weather = useGetWeatherInfo();
  const weatherType =weather.type;
  const detailedPageRef = useRef(null);

  const handleClick = () => {
    setShowDetails(true);
    detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });

  };

  const handleBack = () => {
    setShowDetails(false);
  };

 useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 페이지 전환 조건을 정의합니다. 예를 들어, 스크롤이 500px 이상 이동했을 때 페이지 전환을 수행합니다.
      if (scrollPosition >= 500) {
        setShowDetails(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <HomeWrapper>
      <MainWrapper>
        <Main onClick={handleClick} weatherType={weatherType} />
      </MainWrapper>
      <div ref={detailedPageRef}>
        {showDetails && (
          <DetailedPageComponentWrapper>
            <DetailedPage onBack={handleBack} />
          </DetailedPageComponentWrapper>
        )}
      </div>
    </HomeWrapper>
  );
};
export default Home;


const MainWrapper = styled.div`
  position:absolute;
  top:0rem;
  width:100%;
  height:100vh;
  background-position: center;
  border : yellow solid 5px;
`



const HomeWrapper = styled.div`
  position:absolute;
  top:0rem;
  width:100%;
  height:100vh;
  background-position: center;
  border : red solid 5px;
 `