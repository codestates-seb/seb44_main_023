import create from "zustand";

const useAccessTokenStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));

export default useAccessTokenStore;
