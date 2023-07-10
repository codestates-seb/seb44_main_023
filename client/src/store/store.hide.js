import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  isHidden: localStorage.getItem("planfinityHidden")
    ? Boolean(JSON.parse(localStorage.getItem("planfinityHidden")))
    : false,

  changeVisibility: () => {
    const defaultValue = localStorage.getItem("planfinityHidden")
      ? Boolean(JSON.parse(localStorage.getItem("planfinityHidden")))
      : false;
    localStorage.setItem("planfinityHidden", JSON.stringify(!defaultValue));

    set(({ isHidden }) => ({ isHidden: !isHidden }));
  },
});

export const useStoreHide = create()(import.meta.DEV ? devtools(store) : store);
