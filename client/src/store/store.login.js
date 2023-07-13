import { create } from "zustand";

const useLoginStore = create((set) => ({
  login: false,
  validation: "",
  accessToken: null,
  refreshToken: null,
  setLogin: (value) => set(() => ({ login: value })),
  setValidation: (message) => set(() => ({ validation: message })),
  setTokens: (accessToken, refreshToken) =>
    set(() => ({ accessToken: accessToken, refreshToken: refreshToken })),
}));

export default useLoginStore;
