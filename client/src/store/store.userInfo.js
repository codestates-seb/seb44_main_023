import create from "zustand";
import { readMemberInfo, readProfileImage } from "../api/members.api";
import Avatar from "../assets/userAvarta.png";

const useUserInfoStore = create((set) => ({
  userInfo: {
    isLoading: true,
    memberId: null,
    email: null,
    password: null,
    nickname: null,
    registeredAt: null,
    terminatedAt: null,
    terminated: false,
    profileImage: Avatar,
  },

  setUserInfo: async (memberId) => {
    try {
      const userInfo = await readMemberInfo(memberId);
      const profileImage = await readProfileImage(memberId);

      set(() => ({
        userInfo: {
          isLoading: false,
          ...userInfo,
          profileImage,
        },
      }));
    } catch (err) {
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
