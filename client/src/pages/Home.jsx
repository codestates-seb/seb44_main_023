import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import smallLogo from '../assets/home/smallLogo.svg';
import bigLogo from '../assets/home/BigLogo.svg';
import moveTo from '../assets/home/moveTo.svg';
import '../index.css';

import Main from '../feature/Home/Main';
import DetailedPage from '../feature/Home/DetailedPage';
import { useGetWeatherInfo } from '../store/store.weather';
import Button from '../components/Button/Button';

const Home = () => {
  const weather = useGetWeatherInfo();
  const weatherType = weather.type;
  const detailedPageRef = useRef(null);
//  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      // setShowDetails(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    const handleScroll = (event) => {
      const deltaY = event.deltaY;
      if (deltaY > 0 ) {
        detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (deltaY < 0 ) {
        window.scrollTo({ top: "0rem", behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // const handleBack = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   setTimeout(() => {
  //     setShowDetails(false);
  //   }, 500);
  // };
  const handleBack = () => {
    detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
  };


return (
  <HomeWrapper>
    <Main onClick={handleBack} weatherType={weatherType} />
    <DetailedPageWrapper ref={detailedPageRef}>
      <DetailedPage onClick={handleClick} weatherType={weatherType} />
    </DetailedPageWrapper>
  </HomeWrapper>
);
};


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-position: center;
  height: 200vh;
`;

const DetailedPageWrapper = styled.div`
  scroll-behavior: smooth;
`;

export default Home;