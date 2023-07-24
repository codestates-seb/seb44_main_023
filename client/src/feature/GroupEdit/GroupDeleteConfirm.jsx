import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Popconfirm from "../../components/Popconfirm/Popconfirm";
import Button from "../../components/Button/Button";
import { FaTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { todoMode, ledgerMode } from "../../utils/util";

import {
	useGetGroupTitle,
	useGroupEditStore,
} from "../../store/store.groupEdit";
import { deleteLedgerGroup } from "../../api/ledgergroupedit.api";
import { deleteTodoGroup } from "../../api/todogroupedit.api";
import useUserInfoStore from "../../store/store.userInfo";

const GroupDeleteConfirm = () => {
	const navigate = useNavigate();
	const {
		mode,

		isModalVisible,
		isEditMode,
		groupTitle,
		inputGroupTitle,
		invitedMembers,
		setIsModalVisible,
		setIsEditMode,
		setInputGroupTitle,
		setGroupTitle,
		setInvitedMembers,
		removeInvitedMember,
		addInvitedMember,
	} = useGroupEditStore();

	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const handleGroupDeleteConfirm = () => {
		setIsConfirmVisible(!isConfirmVisible);
	};
	const [validation, setValidation] = useState("");
	const { userInfo } = useUserInfoStore();
	const memberId = userInfo.memberId;

	const { groupId } = useParams();

	const handleConfirm = async (event) => {
		console.log("groupId!:", groupId);

		console.log("멤버를 지우자!");
		//api통신으로 멤버지우기 요청을 따로해야하는가?

		try {
			console.log("그룹을  지우자!");
			console.log("groupId! mode:", mode);

			if (mode == todoMode) {
				await deleteTodoGroup(groupId);
			} else if (mode == ledgerMode) {
				await deleteLedgerGroup(groupId);
			}

			//성공시 초기화후 메인으로 이동
			setInvitedMembers([]);
			setGroupTitle("");
			// setIsConfirmVisible(false);
			setIsEditMode(false);
			setIsModalVisible(false);
			navigate("/");
			window.location.reload();
		} catch (err) {
			setValidation(err.response);
		}
	};

	return (
		<div>
			<DeleteConfirm
				title="정말 삭제하시겠습니까?" // 제목
				description="되돌릴 수 없습니다!" // 설명
				cancelText="취소" // 취소 자리에 들어갈 텍스트, 버튼 컴포넌트 등
				confirmText="확인" // 확인 자리에 들어갈 텍스트, 버튼 컴포넌트 등
				onConfirm={handleConfirm} // 확인 눌렀을 때 실행할 함수
			>
				<Button
					label={
						<div>
							<FaTrashCan /> 그룹삭제
						</div>
					} // 버튼 Text 지정 가능
					size="small" // 버튼 사이즈
					onClick={handleGroupDeleteConfirm} // onClick
					fontcolor={"var(--color-white)"} // 폰트 색 변경
					backgroundColor={"var(--color-red-01)"} // 배경색 변경
					bordercolor={"var(--color-red-01)"} // 배경색 변경
				/>
			</DeleteConfirm>
		</div>
		// <button onClick={handleConfirm}>삭제</button>
	);
};

export default GroupDeleteConfirm;

const DeleteConfirm = styled(Popconfirm)``;
