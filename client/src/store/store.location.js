import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { location, setLocation } = useLocationStore();

const store = (set) => ({
  //default location seoul.
  location: { latitude: "37.5665", longitude: "126.9780" },
  setLocation: (latitude, longitude) =>
    set({ location: { latitude, longitude } }),
});

// 개발 환경일 경우 개발자 도구 노출
export const useLocationStore = create()(
  import.meta.env.MODE === "development" ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetLocation = () => {
  return useLocationStore((state) => state.location);
};
