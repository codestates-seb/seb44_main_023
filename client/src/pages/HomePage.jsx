import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../index.css";
import "../feature/Home/home.css";
import Intro from "../feature/Home/Intro";
import Detail from "../feature/Home/Detail";
import { useGetWeatherInfo } from "../store/store.weather";
import WeatherImage from "../feature/Home/WeatherImage";

const DIVIDER_HEIGHT = 5;

const Home = () => {
  const outerDivRef = useRef();
  const [setScrollIndex] = useState(1);
  const weather = useGetWeatherInfo();
  const weatherType = weather.type;

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; 
      const pageHeight = window.innerHeight; 

      if (deltaY > 0) {

        if (scrollTop >= 0 && scrollTop < pageHeight) {


          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else {
 
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        }
      } else {

        if (scrollTop >= 0 && scrollTop < pageHeight) {


          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else {

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
    const pageHeight = window.innerHeight;

    outerDivRef.current.scrollTo({
      top: pageHeight + DIVIDER_HEIGHT,
      left: 0,
      behavior: "smooth",
    });
    setScrollIndex(2);
  };

  return (
    <Out>
      <WeatherImage weatherType={weatherType} style={{ zIndex: "-1" }} />
      <Overlay />
      <HomeWrapper ref={outerDivRef}>
        <Intro onClick={handleDown} weatherType={weatherType} />
        <Detail weatherType={weatherType} />
      </HomeWrapper>
    </Out>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(155, 155, 155, 0.253); 
  z-index: 0; 
`;

const Out = styled.div`
  height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const HomeWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  top: 0;
`;

export default Home;
