import { useEffect } from "react";
import { useGetLocation } from "../../store/store.location";
import { useWeatherInfoStore } from "../../store/store.weather";
import Location from "./Location.api"
import axios from "axios";
import {roundDecimal} from "../../utils/util"

//날씨하루치 정보를 불러와서 최대 최소값 찾아서 저장

const WeatherMinMax = () => {
  //업데이트된정보 불러오기 , 실패시 디폴트 서울
  const location = useGetLocation();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const { setWeatherMinMax } = useWeatherInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&lang=kr`
        );
        
     const apiResponseData = responseData.data;
     const listArray = apiResponseData.list;
     const mainArray = listArray.map(obj => obj.main);
    
     const minArray = mainArray.map(obj => obj.temp_min);
     const temp_min = Math.min(...minArray);
    
     const maxArray = mainArray.map(obj => obj.temp_max);
     const temp_max = Math.max(...maxArray);

     setWeatherMinMax(
      roundDecimal(temp_min),
      roundDecimal( temp_max)
      );

 } catch (error) {
        console.error("최대 최소 날씨 정보를 가져오는 중 오류가 발생:", error);      }
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
export default WeatherMinMax;
