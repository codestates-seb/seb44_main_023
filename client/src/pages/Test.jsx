import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/background.png";
import ErrorCode from "../assets/404page.svg";
import "../index.css";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget"
import Location from "../feature/WeatherWidget/Location";
import Weather from "../feature/WeatherWidget/Weather";
const Test = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleButtonClick = () => {
    navigate("/main"); 
  };

  return (
    <>
        <WeatherWidget></WeatherWidget>
    </>
  );
};

export default Test;
