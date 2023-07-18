import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { weatherInfo, setweatherInfo } = useWeatherInfoStore();

const store = (set) => ({
  weatherInfo: {
    country: null,
    weather: null,
    weatherIconURL: null,
    type: null,
    temp: null,
    temp_min: null,
    temp_max: null,
  },
  setWeatherInfo: (country, weather, weatherIconURL, type, temp) =>
    set((state) => ({
      weatherInfo: {
        country,
        weather,
        weatherIconURL,
        type,
        temp,
        temp_min: null,
        temp_max: null,
      },
    })),
  setWeatherMinMax: (temp_min, temp_max) =>
    set((state) => ({
      weatherInfo: {
        ...state.weatherInfo,
        temp_min,
        temp_max,
      },
    })),

  // set((state) => ({
  //   weatherInfo: { ...state.weatherInfo, temp_min, temp_max },
  // })
});

// 개발 환경일 경우 개발자 도구 노출
export const useWeatherInfoStore = create()(
  import.meta.env.MODE === "development" ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetWeatherInfo = () => {
  return useWeatherInfoStore((state) => state.weatherInfo);
};
