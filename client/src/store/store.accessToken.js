import create from "zustand";

const useAccessTokenStore = create((set) => ({
  accessToken: null,
  expirationTime: null,
  setAccessToken: (token) =>
    set(() => ({
      accessToken: token,
      expirationTime: new Date(Date.now() + 86400000),
    })),
}));

export default useAccessTokenStore;
