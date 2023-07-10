import { useGetWeatherInfo} from "../../store/store.weather";
import { styled } from "styled-components";
import { useGetLocation } from "../../store/store.location";
import Weather from "../../feature/WeatherWidget/Weather";

//저장된 날씨정보를 불러와서 위젯표시 하는 부분
const WeatherWidget = () => {
     //업데이트된정보 불러오기 , 실패시 디폴트 서울날씨
    const weather = useGetWeatherInfo();
    console.log("in WeatherWidget ",weather)

  //렌더링
  return (
 <>
    {/*날씨정보 업데이트를 도와주는 컴포넌트 */}
    <Weather/>
    <WeatherWrapper>
      {weather ? (
        <div>
          <WeatherDivRow>
          <WeatherDivCol>
           <WeatherIcon>
              <img
                src={weather.weatherIconURL}
                alt="weatherIcon"
                
                width="54"
                height="54"
                className="weatherIcon"
              />
              </WeatherIcon>
             <WeatherText>{weather.weather}</WeatherText>
           </WeatherDivCol>
           <WeatherDivCol>
            <WeatherText>{weather.temp}</WeatherText>
             <WeatherText>{weather.temp_min}/{weather.temp_max}</WeatherText>
             <WeatherText>{weather.country}</WeatherText>
            </WeatherDivCol>
          </WeatherDivRow>
           </div>
          
          ) : (
            <p>현재 날씨 정보를 가져오는 중입니다...</p>
          )}
       </WeatherWrapper>
    </>
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
