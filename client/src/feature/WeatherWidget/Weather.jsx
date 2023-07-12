import { useEffect } from "react";
import { useGetLocation } from "../../store/store.location";
import { useWeatherInfoStore } from "../../store/store.weather";
import Location from "./Location"
import axios from "axios";
import {roundDecimal} from "../../utils/util"
import { getWeatherType } from "./getWeatherType";
//날씨정보를 불러와서 저장
//({ weatherInfo: { country, temp, temp_max, temp_min, type, weather } })
const Weather = () => {
  //업데이트된정보 불러오기 , 실패시 디폴트 서울
  const location = useGetLocation();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const{ weatherInfo,setWeatherInfo }= useWeatherInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&lang=kr`
        );
        
      const apiResponse = response.data;
      const { name, main, weather} = apiResponse;
      const { currTemp } = main;
      const { temp_min,temp_max } = temp;

      const  country  = name;
      const weatherKR=weather[0].description;
      const icon = weather[0].icon;
      const type = getWeatherType(icon);
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        setWeatherInfo(
          country,
          roundDecimal(currTemp),
          roundDecimal(temp_min),
          roundDecimal( temp_max),
          weatherKR,
          type,
          iconURL
          );
      } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (  
    //지역정보업데이트 
    <Location/>
    );
}
export default Weather;
