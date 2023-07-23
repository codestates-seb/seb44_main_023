import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 사용방법
// const { isModalVisible, isEditMode,inputGroupTitle, groupTitle,invitedMembers,setIsModalVisible, setIsEditMode,  setInputGroupTitle, setGroupTitle, setInvitedMembers ,removeInvitedMember,addInvitedMember} = useGroupEditStore();

const store = (set) => ({
	isModalVisible: false,
	isEditMode: false,
	inputGroupTitle: "",
	groupTitle: "",
	invitedMembers: [], // 추가: 초대된 멤버 목록 배열
	setIsModalVisible: (value) => {
		set({ isModalVisible: value });
	},
	setIsEditMode: (value) => {
		set({ isEditMode: value });
	},

	setInputGroupTitle: (value) => {
		set({ inputGroupTitle: value });
	},

	setGroupTitle: (value) => {
		set({ groupTitle: value });
	},
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
			if (inputMember !== "" && filtered.length === 0) {
				const newMembers = [...state.invitedMembers, inputMember];
				return { invitedMembers: newMembers };
			} else {
				return { invitedMembers: state.invitedMembers };
			}
		});
	},
});

// 개발 환경일 경우 개발자 도구 노출
export const useGroupEditStore = create()(
	import.meta.DEV ? devtools(store) : store
);

// 재활용이 많은 스토어일 경우 아래처럼 불러올 수 있음

export const useGetIsModalVisible = () => {
	return useGroupEditStore((state) => state.isModalVisible);
};

export const useGetIsEditMode = () => {
	return useGroupEditStore((state) => state.isEditMode);
};
export const useGetGroupTitle = () => {
	return useGroupEditStore((state) => state.groupTitle);
};

export const useGetInvitedMembers = () => {
	return useGroupEditStore((state) => state.invitedMembers);
};
