import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { inputMember,invitedMembers, setInvitedMembers,removeInvitedMember, addInvitedMember } = useGroupInviteStore();

const store = (set) => ({
  //디폴트로 로그인한유저는 들어가게 설정변경필요

  inputMember: "",
  invitedMembers: [], // 추가: 초대된 멤버 목록 배열
  setInvitedMembers: (members) => set({ invitedMembers: members }), // 수정: setGroupMembers는 invitedMembers를 업데이트해야 함
  removeInvitedMember: (indexToRemove) => {
    set((state) => ({
      invitedMembers: state.invitedMembers.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  }, // 수정: invitedMembers를 업데이트하도록 변경
  addInvitedMember: (inputMember) => {
    set((state) => {
      const filtered = state.invitedMembers.filter((el) => el === inputMember);
      if (event.target.value !== "" && filtered.length === 0) {
        const newMembers = [...state.invitedMembers, inputMember];
        return { invitedMembers: newMembers };
      } else {
        return { invitedMembers: state.invitedMembers };
      }
    });
  },
});

// 개발 환경일 경우 개발자 도구 노출
export const useGroupInviteStore = create()(
  import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음
export const useGetGroupInvitedMembers = () => {
  return useGroupInviteStore((state) => state.invitedMembers);
};
