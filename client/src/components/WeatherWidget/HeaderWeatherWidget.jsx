import { useGetWeatherInfo } from "../../store/store.weather";
import { styled } from "styled-components";
import Weather from "../../api/WeatherWidget/Weather.api";
import { LuMapPinOff } from "react-icons/lu";

const HeaderWeatherWidget = () => {
  const weather = useGetWeatherInfo();

  // Check if weather data is available
  const isWeatherAvailable = weather && weather.weatherIconURL;

  return (
    <>
      <WeatherWrapper>
        <Weather />

        <StyledContain>
          {isWeatherAvailable ? (
            <Wallpaper>
              <WeatherIcon>
                <img
                  src={weather.weatherIconURL}
                  alt="weatherIcon"
                  className="weatherIcon"
                />
              </WeatherIcon>
              <WeatherDivCol>
                <WeatherLargeText>{weather.temp}°</WeatherLargeText>
                <WeatherText>
                  {weather.temp_min}°/{weather.temp_max}°
                </WeatherText>
              </WeatherDivCol>
            </Wallpaper>
          ) : (
            <NoWeatherIcon />
          )}
        </StyledContain>
      </WeatherWrapper>
    </>
  );
};

export default HeaderWeatherWidget;

const WeatherWrapper = styled.div``;

const StyledContain = styled.div`
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
`;

const WeatherIcon = styled.div`
  width: 5em;
  height: 5rem;
`;

const Wallpaper = styled.div`
  height: 40px;
  width: 100px;
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
`;

const WeatherDivCol = styled.div`
  width: 50px;
  height: 45px;
  /* border: 1px solid red; */
`;

const WeatherLargeText = styled.div`
  font-size: 2rem;
  margin-left: 5px;
`;

const WeatherText = styled.div`
  font-size: 1.1rem;
`;

const NoWeatherIcon = styled(LuMapPinOff)`
  width: 2.4rem;
  height: 2.4rem;
  padding: 7px;
  margin-top: 2px;
  color: var(--color-gray-09);
  cursor: pointer;
`;
