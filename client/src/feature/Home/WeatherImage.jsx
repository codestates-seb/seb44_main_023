import React from "react";
import atmosphere from "../../assets/home/screens/atmosphere.png";
import cloudy from "../../assets/home/screens/cloudy.png";
import rain from "../../assets/home/screens/rain.png";
import snow from "../../assets/home/screens/snow.png";
import sunny from "../../assets/home/screens/sunny.png";
import thunderstorm from "../../assets/home/screens/thunderstorm.png";


const typeNameMapper = new Map([
  //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

  //Group 2xx: Thunderstorm, Icon 11x
  [11, "thunderstorm"],
  //Group 3xx: Drizzle, Icon 09x
  [9, "rain"],
  //Group 5xx: Rain, Icon 10x
  [10, "rain"],
  //Group 6xx: Snow, Icon 13x
  [13, "snow"],
  //Group 7xx: Atmosphere, Icon 50x
  [50, "atmosphere"],
  //Group 800: Rain, Icon 01x
  [1, "sunny"],
  //Group 80x: Clouds, Icon 02x,03x,04x
  [2, "cloudy"],
  [3, "cloudy"],
  [4, "cloudy"],
  // 추가적인 날씨 종류와 이미지 파일 경로를 정의할 수 있습니다.
  //default, fail to loading weather api
  [0, "sunny"],
]);

export function weatherTypeToName(weatherType) {
 const backgroundImage = typeNameMapper.get(weatherType);
   return backgroundImage;
}

const getWeatherImage = (weatherType) => {
  switch (weatherType) {
    case "atmosphere":
      return atmosphere;
    case "cloudy":
      return cloudy;
    case "rain":
      return rain;
    case "snow":
      return snow;
    case "sunny":
      return sunny;
    case "thunderstorm":
      return thunderstorm;
    default:
      return sunny;
  }
};

const WeatherImage = ({ weatherType }) => {
  //숫자일대 이름으로 바꾸고 아니면 그냥 쓰는작업 처리하기 
  console.log("weatherType : ",weatherType)
  let weatherName = "";
  if (typeof weatherType ==="string"){
    weatherName = weatherType;
  }else {
    weatherName = weatherTypeToName(weatherType);
  }
  
  console.log("WeatherImage : ",weatherName)
  const weatherImage = getWeatherImage(weatherName);

  return (
     <img src={weatherImage} alt="Weather" />
      );
};

export default WeatherImage;
