import { useEffect } from "react";
import { useGetLocation } from "../../store/store.location";
import { useWeatherInfoStore } from "../../store/store.weather";
import { styled } from "styled-components";

import axios from "axios";

//날씨정보를 불러와서 저장, 위젯표시 하는 부분
//({ weatherInfo: { country, temp, temp_max, temp_min, weather } })
const WeatherWidget = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const location = useGetLocation();
  const{ weatherInfo,setWeatherInfo }= useWeatherInfoStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&lang=kr`
        );
        
      const apiResponse = response.data;
      const { name, main, weather} = apiResponse;
      const { temp, temp_min, temp_max } = main;
      const  country  = name;
      const weatherKR=weather[0].description;
      const icon = weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        setWeatherInfo(
          country,
          temp,
          temp_min,
          temp_max,
          weatherKR,
          iconURL
          );
          console.log("response",weatherInfo);
      } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <WeatherWrapper>
      {location && weatherInfo ? (
    <div>
      <WeatherDivRow>
      <WeatherDivCol>
       <WeatherIcon>
          <img
            src={weatherInfo.weatherIconURL}
            alt="weatherIcon"
            width="54"
            height="54"
            className="weatherIcon"
          />
          </WeatherIcon>
         <WeatherText>{weatherInfo.weather}</WeatherText>
       </WeatherDivCol>
       <WeatherDivCol>
        <WeatherText>{weatherInfo.temp}</WeatherText>
         <WeatherText>{weatherInfo.temp_min}/{weatherInfo.temp_max}</WeatherText>
         <WeatherText>{weatherInfo.country}</WeatherText>
        </WeatherDivCol>
      </WeatherDivRow>
       </div>
      
      ) : (
        <p>현재 위치 정보를 가져오는 중입니다...</p>
      )}
    </WeatherWrapper>
  );
}
export default WeatherWidget;

const WeatherIcon = styled.div`
`;
const WeatherDivRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
const WeatherDivCol = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center; /* 수직 가운데 정렬 */
`;

const WeatherText = styled.span`
  position: relative;
  color: var(--color-gray-08);
`;
const WeatherWrapper = styled.div`
display: flex;

  position: relative;
  width : 100px;
  height : 100px;
`;
