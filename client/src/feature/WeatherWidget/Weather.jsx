import { useEffect } from "react";
import { useGetLocation } from "../../store/store.location";
import { useWeatherInfoStore } from "../../store/store.weather";
import Location from "./Location"
import axios from "axios";

//날씨정보를 불러와서 저장
//({ weatherInfo: { country, temp, temp_max, temp_min, weather } })
const Weather = () => {
  //지역정보업데이트 

  //업데이트된정보 불러오기 , 실패시 디폴트 서울
  const location = useGetLocation();
  console.log("in Weather ",location);

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
      console.log(" in Weather response",weatherInfo);
      
      } catch (error) {
        console.error("날씨 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (  
    <Location/>
  );
}
export default Weather;
