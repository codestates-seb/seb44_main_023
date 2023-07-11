import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { weatherInfo, setweatherInfo } = useWeatherInfoStore();

const store = (set) => ({
  weatherInfo: null,
  setWeatherInfo: (
    country,
    temp,
    temp_min,
    temp_max,
    weather,
    weatherIconURL
  ) =>
    set({
      weatherInfo: {
        country,
        temp,
        temp_min,
        temp_max,
        weather,
        weatherIconURL,
      },
    }),
});

// 개발 환경일 경우 개발자 도구 노출
export const useWeatherInfoStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetWeatherInfo = () => {
  return useWeatherInfoStore((state) => state.weatherInfo);
};
