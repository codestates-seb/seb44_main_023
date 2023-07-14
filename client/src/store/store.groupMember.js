import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { groupMembers, setGroupMembers, addGroupMember } = useGroupMemberStore();

const store = (set) => ({
  //디폴트로 로그인한유저는 들어가게 설정변경필요
  inputMember: "",
  groupMembers: [],
  setGroupMembers: (newMembers) => set({ groupMembers: newMembers }),
  addGroupMember: () => {
    set((state) => {
      if (state.inputMember.trim() !== "") {
        const newMembers = [...state.groupMembers, state.inputText];
        return { groupMembers: newMembers, inputMember: "" };
      }
    });
  },
});

// 개발 환경일 경우 개발자 도구 노출
export const useGroupMemberStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetGroupMemberStore = () => {
  return useGroupMemberStore((state) => state.groupMembers);
};
