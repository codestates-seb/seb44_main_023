import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { isEditMode,setIsEditMode,  groupTitle, setGroupTitle } = useGroupEditStore();

const store = (set) => ({
  isEditMode: false,
  groupTitle: "Group 1",
  setIsEditMode: (value) => {
    set({ isEditMode: value });
  },
  setGroupTitle: (value) => {
    set({ groupTitle: value });
  },
});

// 개발 환경일 경우 개발자 도구 노출
export const useGroupEditStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
// export const useGetGroupEdit = () => {
//   return useGroupEditStore((state) => state.groupTitle);
// };
