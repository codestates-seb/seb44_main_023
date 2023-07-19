import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { count, plusCount, minusCount } = useStoreCount();

const store = (set) => ({
  count: 0,

  plusCount: () => {
    set(({ count }) => ({
      count: count + 1,
    }));
  },

  minusCount: () => {
    set(({ count }) => ({
      count: count - 1,
    }));
  },
});

// 개발 환경일 경우 개발자 도구 노출
export const useStoreCount = create()(
  import.meta.env.MODE === "development" ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetCount = () => {
  return useStoreCount((state) => state.count);
};
