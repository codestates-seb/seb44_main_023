import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import smallLogo from '../assets/home/smallLogo.svg';
import bigLogo from '../assets/home/BigLogo.svg';
import moveTo from '../assets/home/moveTo.svg';
import '../index.css';
import '../feature/Home/home.css';
import Main from '../feature/Home/Main';
import DetailedPage from '../feature/Home/DetailedPage';
import { useGetWeatherInfo } from '../store/store.weather';
import Button from '../components/Button/Button';
import WeatherImage from '../feature/Home/WeatherImage';


const DIVIDER_HEIGHT = 5;

const Home = () => {
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  const weather = useGetWeatherInfo();
    const weatherType = weather.type;
    const detailedPageRef = useRef(null);
  // //  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else {
          // 현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        }
        else {
          // 현재 3페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const handleDown = () => {
    const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

    //detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log("현재 1페이지, down");
    outerDivRef.current.scrollTo({
      top: pageHeight + DIVIDER_HEIGHT,
      left: 0,
      behavior: "smooth",
    });
   // outerDivRef.current.scrollIntoView({ behavior: 'smooth' });
    setScrollIndex(2);
  };

return (

  <HomeWrapper ref={outerDivRef} >

    <Main onClick={handleDown} weatherType={weatherType} />
    <DetailedPage weatherType={weatherType} />
 </HomeWrapper>

);
};
const Out= styled.div`

height: 100vh;
overflow-y: auto;
`
// .outer::-webkit-scrollbar {
//   display: none;
// }

const HomeWrapper = styled.div`
    height: 100vh;
  overflow-y: auto;

`;


// display: flex;
// flex-direction: column;
// width: 100%;
// background-position: center;
// height: 200vh;
const DetailedPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;

