import React from "react";
import styled from 'styled-components';
import {weatherTypeToName, getWeatherImage} from "../../utils/weatherTypeToImage"
import './home.css';

const WeatherImage = ({ weatherType }) => {
  
  let weatherName = "";
  if (typeof weatherType ==="string"){
    weatherName = weatherType;
  }else {
    weatherName = weatherTypeToName(weatherType);
  }
  const weatherImage = getWeatherImage(weatherName);

  return (
    <ImageWrapper background={weatherImage}  className="brighten" />
  );
};

export default WeatherImage;

const ImageWrapper = styled.div`
  background-size: cover;
  background-position: center;
  height: 100vh;
  
  background-image: url(${props => props.background});
  z-index: -2;
  `
  // filter: blur(0.5rem);