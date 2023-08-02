import React from "react";
import styled from "styled-components";
import {
  weatherTypeToName,
  getWeatherImage,
} from "../../utils/weatherTypeToImage";
import "./home.css";
import { useGetWeatherInfo } from "../../store/store.weather";

const WeatherImage = () => {
  const weather = useGetWeatherInfo();
  const weatherType = weather.type;
  let weatherName = "";
  if (typeof weatherType === "string") {
    weatherName = weatherType;
  } else {
    weatherName = weatherTypeToName(weatherType);
  }
  const weatherImage = getWeatherImage(weatherName);

  return <ImageWrapper background={weatherImage} />;
};

export default WeatherImage;

const ImageWrapper = styled.div`
  background-size: cover;
  background-position: center;
  height: 100vh;

  background-image: url(${(props) => props.background});
  z-index: -2;
`;
// filter: blur(0.5rem);
