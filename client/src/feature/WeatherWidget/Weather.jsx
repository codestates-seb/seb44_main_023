import { useEffect } from "react";
import { useGetLocation } from "../../store/store.location";
import { useWeatherInfoStore } from "../../store/store.weather";
import Location from "./Location"
import WeatherMinMax from "./WeatherMinMax";
import axios from "axios";
import {roundDecimal} from "../../utils/util"
import { getWeatherType } from "./getWeatherType";

//날씨정보를 불러와서 저장, 최대최소는 다른컴포넌트를 부름으로써 할당
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
    const country  = name;
    const weatherKR=weather[0].description;
    const icon = weather[0].icon;
    const type = getWeatherType(icon);
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    setWeatherInfo(
      country,
      weatherKR,
      iconURL,
      type,
      roundDecimal(main.temp)
      );

      console.log("weatherInfo : ",weatherInfo)

      } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류가 발생:", error);      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (  
   
    <>
     {/*지역정보업데이트  */}
    <Location/>
    {/* 날씨 최대 최소값 할당 */}
    <WeatherMinMax/>
    </>
    );
}
export default Weather;
