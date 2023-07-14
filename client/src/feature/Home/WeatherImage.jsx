import React from "react";
import styled from 'styled-components';
import {weatherTypeToName, getWeatherImage} from "../../utils/weatherTypeToImage"

const WeatherImage = ({ weatherType }) => {
  
  let weatherName = "";
  if (typeof weatherType ==="string"){
    weatherName = weatherType;
  }else {
    weatherName = weatherTypeToName(weatherType);
  }
  const weatherImage = getWeatherImage(weatherName);

  return (
    <HomeWrapper background={weatherImage}  className="blurred" />
  );
};

export default WeatherImage;

const HomeWrapper = styled.div`
  background-size: cover;
  background-position: center;
  height: 100vh;
  &.blurred {
    filter: brightness(1.4);
  }
  background-image: url(${props => props.background});
  z-index: -2;
  `
  // filter: blur(0.5rem);