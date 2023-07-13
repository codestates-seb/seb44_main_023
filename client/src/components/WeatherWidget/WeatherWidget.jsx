import { useGetWeatherInfo } from "../../store/store.weather";
import { styled } from "styled-components";
import Weather from "../../feature/WeatherWidget/Weather";

const WeatherWidget = ({ scale = 1 }) => {
  const weather = useGetWeatherInfo();
  return (
    <>
      <WeatherWrapper scale={scale}>
        <Weather />
        {weather ? (
          <WeatherGrid scale={scale}>
            <WeatherIcon justifyCenter="true" scale={scale}>
              <img
                src={weather.weatherIconURL}
                alt="weatherIcon"
                className="weatherIcon"
              />
            </WeatherIcon>
            <WeatherDivCol>
              <WeatherLargeText scale={scale}>{weather.temp}°</WeatherLargeText>
              <WeatherText scale={scale}>{weather.temp_min}/{weather.temp_max}</WeatherText>
            </WeatherDivCol>
            <WeatherText justifyCenter="true" scale={scale}>{weather.weather}</WeatherText>
            <WeatherText justifyCenter="true" scale={scale}>{weather.country}</WeatherText>
          </WeatherGrid>
        ) : (
          <p>현재 날씨 정보를 가져오는 중입니다...</p>
        )}
      </WeatherWrapper>
    </>
  );
};

export default WeatherWidget;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1fr;
  gap: ${(props) =>0.1 * props.scale}rem;
  align-items: center;
  transform: scale(${(props) => props.scale});
`;

const WeatherDivCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;

`;

const WeatherIcon = styled.div`
  width: ${(props) => 8 * props.scale}rem;
  height: ${(props) =>8 * props.scale}rem;
  justify-self: center;
  transform: scale(${(props) => props.scale});
`;

const WeatherLargeText = styled.span`
  position: relative;
  color: var(--color-gray-07);
  font-size: ${(props) => 4 * props.scale}rem;
  justify-self: center;

`;

const WeatherText = styled.span`
  position: relative;
  color: var(--color-gray-07);
  font-size: ${(props) => 1.4 * props.scale}rem;
  justify-self: center;
`;

const WeatherWrapper = styled.div`
  display: flex;
  width: ${(props) => 20 * props.scale}rem;
  height: ${(props) => 10 * props.scale}rem;
  transform: scale(${(props) => props.scale});
`;