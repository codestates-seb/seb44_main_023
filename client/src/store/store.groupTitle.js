import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { groupTitle, setGroupTitle } = useGroupTitleStore();

const store = (set) => ({
  //default location seoul.
  groupTitle: "",
  setGroupTitle: (value) => {
    set({ groupTitle: value });
  },
});

// 개발 환경일 경우 개발자 도구 노출
export const useGroupTitleStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetGroupTitle = () => {
  return useGroupTitleStore((state) => state.groupTitle);
};
