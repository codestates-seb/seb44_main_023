import  { useEffect } from "react";
import { useLocationStore } from "../../store/store.location";

const Location = () => {
  const {location, setLocation} = useLocationStore();

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보를 가져오는 중 오류가 발생했습니다:", error);
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않는 환경입니다.");
    }  }, []);


  return (
    <div>
      {location ? (
        <div>
          <h2>현재 위치 정보</h2>
          <p>위도: {location.latitude}</p>
          <p>경도: {location.longitude}</p>
          {/* 날씨 API 호출 및 날씨 정보 표시 등 추가 작업 */}
        </div>
      ) : (
        <p>현재 위치 정보를 가져오는 중입니다...</p>
      )}
    </div>
  );
};

export default Location;