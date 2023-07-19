import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { isTodoNull,isLedgerNull, setIsTodoNull,setIsLedgerNull } = useContentIsNullStore();

const store = (set) => ({
  //default location seoul.
  isTodoNull: true,
  isLedgerNull: true,
  setIsTodoNull: (isNull) => set({ isTodoNull: isNull }),
  setIsLedgerNull: (isNull) => set({ isLedgerNull: isNull }),
});

// 개발 환경일 경우 개발자 도구 노출
export const useContentIsNullStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetIsTodoNull = () => {
  return useContentIsNullStore((state) => state.isTodoNull);
};

export const useGetIsLedgerNull = () => {
  return useContentIsNullStore((state) => state.isLedgerNull);
};
