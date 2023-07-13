// 회원가입(store)
import { create } from "zustand";

const useSignupStore = create((set) => ({
  signup: false,
  validation: "",
  setSignup: (value) => set(() => ({ signup: value })),
  setValidation: (message) => set(() => ({ validation: message })),
}));

export default useSignupStore;
