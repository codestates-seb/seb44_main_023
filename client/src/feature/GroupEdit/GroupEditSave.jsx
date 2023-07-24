import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { todoMode, ledgerMode } from "../../utils/util";
import {
	useGroupEditStore,
	useGetGroupTitle,
	useGetInvitedMembers,
} from "../../store/store.groupEdit";

import "./group.css";
import { updateLedgerGroup } from "../../api/ledgergroupedit.api";
import { updateTodoGroup } from "../../api/todogroupedit.api";
const memberId = 1;

const GroupEditSave = () => {
	const {
		mode,
		inputGroupTitle,
		invitedMembers,
		setIsModalVisible,
		setInputGroupTitle,
		setIsEditMode,
		setGroupTitle,
		setInvitedMembers,
		removeInvitedMember,
		addInvitedMember,
	} = useGroupEditStore();
	//통신성공여부메시지
	const [memberValidation, setMemberValidation] = useState("");
	const [titleValidation, setTitleValidation] = useState("");

	const { groupId } = useParams();
	const handleSaveGroupEdit = async (event) => {
		if (invitedMembers.length !== 0) {
			console.log("가계부멤버초대하자!", invitedMembers.length, invitedMembers);
			//  try {
			//  event.preventDefault();
			// //api통신으로 멤버초대요청

			// //성공후에만 할행동

			//  } catch (err) {
			//     setMemberValidation(err.response.data);
			//  //실패후에만 할행동
			//     console.log("memberValidation:",memberValidation);
			//  }
		}

		if (inputGroupTitle !== "") {
			console.log("가계부그룹이름바꾸자!:", inputGroupTitle);

			try {
				//api통신으로 그룹명변경요청
				// await updateMemberNickname(profileInfo.memberId, nicknameInput);
				console.log("가계부 groupId!:", groupId);

				if (mode == todoMode) {
					await updateTodoGroup(groupId, inputGroupTitle);
				} else if (mode == ledgerMode) {
					await updateLedgerGroup(memberId, groupId, inputGroupTitle);
				}

				//성공시에 보여지는 그룹타이틀명을 변경한다.
				setGroupTitle(inputGroupTitle);
				window.location.reload();
			} catch (err) {
				setTitleValidation(err.response.data);
				console.log("titleValidation:", titleValidation);
			}
		}
		//성공하고선 기본으로 초기화
		setInvitedMembers([]);
		setInputGroupTitle("");
		setIsEditMode(false);
		setIsModalVisible(false);
	};

	return (
		<div>
			<Button
				label="저장하기" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={handleSaveGroupEdit} // onClick
				fontcolor={"var(--color-white)"} // 폰트 색 변경
				backgroundColor={"var(--color-blue-03)"} // 배경색 변경
				bordercolor={"var(--color-blue-03)"} // 배경색 변경
			/>
		</div>
	);
};

export default GroupEditSave;
