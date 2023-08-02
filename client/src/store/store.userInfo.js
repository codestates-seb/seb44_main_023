import create from "zustand";
import { readMemberInfo, readProfileImage } from "../api/members.api";
import Avatar from "../assets/userAvarta.png";

const useUserInfoStore = create((set) => ({
  userInfo: {
    isLoading: true,
    isLogin: false,
    accessToken: null,
    memberId: null,
    email: null,
    password: null,
    nickname: null,
    registeredAt: null,
    terminatedAt: null,
    terminated: false,
    profileImage: Avatar,
  },

  setUserInfo: async (accessToken) => {
    try {
      const userInfo = await readMemberInfo(accessToken);
      const profileImage = await readProfileImage();
      set(() => ({
        userInfo: {
          isLoading: false,
          ...userInfo,
          profileImage,
        },
      }));
    } catch (err) {
      set(({ userInfo }) => ({
        userInfo: {
          ...userInfo,
          isLoading: false,
        },
      }));
      console.log(err);
    }
  },

  updateUserInfo: (data) => {
    set((prev) => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        ...data,
      },
    }));
  },
}));

export default useUserInfoStore;

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetUserInfo = () => {
  return useUserInfoStore((state) => state.userInfo);
};
