import  { useEffect } from "react";
import { useLocationStore } from "../../store/store.location";

const Location = () => {
  const {setLocation} = useLocationStore();

  
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

    return null;
};

export default Location;