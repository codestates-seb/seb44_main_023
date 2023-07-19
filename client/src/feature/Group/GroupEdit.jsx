import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/PageInput";
import { FaTrashCan } from "react-icons/fa6";

import { useGroupInviteStore } from "../../store/store.groupInvite";
import { useGroupEditStore } from "../../store/store.groupEdit";
import { MemberListTag } from "./MemberListTag";

const GroupEdit = () => {
 	const { isEditMode, setIsEditMode,  groupTitle, setGroupTitle } = useGroupEditStore();
	const [inputGroupTitle, setInputGroupTitle]=useState("");
	
	//친구초대관련 스테이트추가	, 근데 친구는 배열임
	//const [inputGroupMember, setInputGroupMembere] = useState('');
	// const { groupTitle, setGroupTitle } = useGroupTitleStore();
	const { inputMember,invitedMembers, setInvitedMembers,removeInvitedMember, addInvitedMember } = useGroupInviteStore();
	const [input,setInput]=useState("");

	const handleSaveGroupEdit = async (event) => {
		//api통신으로 그룹명변경요청
		// try {
		// event.preventDefault();
		// await updateMemberNickname(profileInfo.memberId, nicknameInput);
		setIsEditMode(false);
		if(inputGroupTitle!==""){
		setGroupTitle(inputGroupTitle);
		}
		setInvitedMembers(invitedMembers);
		// setValidation("");
		console.log("멤버초대하자!",invitedMembers)

		//초대된후 
		setInvitedMembers([]);
		// } catch (err) {
		// setValidation(err.response.data);
		// }
	
	};

	const handleCancelGroupEdit = () => {
		setIsEditMode(false);
		setGroupTitle(groupTitle);
		//친구초대관련해서도 초기화하는 기능 추가 
		setInvitedMembers([]);
	};
	  
	const handleAddMember = (event) => {
		const inputMember = event.target.value
		if(event.key === 'Enter'){
			addInvitedMember(inputMember);
			event.target.value="";
		}
		// (event.key === 'Enter' ? addInvitedMember(inputMember) event.target.value=""; : null)

	  };
	

	return(
		<GroupWapper>
		  <GroupDivCol>
			<div>
		 	  <GroupTitle>현재 그룹명</GroupTitle>
			  <EmptyBox style={{height:"3.3rem"}}/>
				<Input
					width={38.6}//"386px"
					height={3}//"30px"
					size={38.6}//"386px"					
					placeHolder={groupTitle}//추후 설정을누른 그룹의 이름을 받아오는 로직으로 변경필요
					defaultValue=""
					fontSize={2}
					onChange={(e) => setInputGroupTitle(e.target.value)}
				/>
			<GroupDescription>그룹명을 변경 하시려면 수정을 클릭해주세요. </GroupDescription>
			<EmptyBox style={{height:"3.8rem"}}/>
			<GroupTitle>친구 초대</GroupTitle>
			<EmptyBox style={{height:"1.8rem"}}/>
			<Input
				width={38.6}//"300px"//투명박스 px
				height={3}//"30px"//투명박스px
				size={38.6}//"386px" //가로길이 px
				placeHolder="이메일을 입력해주세요"
				defaultValue={input}
				fontSize={1.6} //인풋에쓰여지는 텍스트싸이즈
				// onChange={(event) => addInvitedMember(event.target.value)}
				// onChange={handleMemberChange}
				onKeyUp={handleAddMember}
			/>
			<EmptyBox style={{height:"0.6rem"}}/>
			<MemberListTag></MemberListTag>
		  </div>
			<GroupDivRow>
				<Button
				label={<div><FaTrashCan/> 그룹삭제</div>} // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={ handleCancelGroupEdit} // onClick
				fontcolor={"var(--color-white)"} // 폰트 색 변경
				backgroundColor={"var(--color-red-01)"} // 배경색 변경
				bordercolor={"var(--color-red-01)"} // 배경색 변경
				
				/>
				<Button
				label="저장하기" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={handleSaveGroupEdit} // onClick				
				fontcolor={"var(--color-white)"} // 폰트 색 변경
				backgroundColor={"var(--color-blue-03)"} // 배경색 변경
				bordercolor={"var(--color-blue-03)"} // 배경색 변경

				/>
			</GroupDivRow>
		  </GroupDivCol>
		</GroupWapper>
	);
}

const GroupInviteList=styled.div`
	display:flex;
	width : 100%;
`
const EmptyBox=styled.div`
	display:flex;
	width : 100%;
`
const GroupDescription=styled.div`
	display:flex;
	flex-direction : column;
	color: var(--color-gray-05);
  font-size: 1.3rem;
  justify-self: center;
`
const GroupTitle=styled.div`
	display:flex;
	flex-direction : column;
	color: var(--color-gray-06);
  font-size: 2rem;
  justify-self: center;
`

const GroupDivCol=styled.div`
	display:flex;
	flex-direction : column;
	justify-content : space-between;
	width : 38.6rem;
	height:85%;
`
const GroupDivRow=styled.div`
	display:flex;
	flex-direction : row;
	justify-content : space-between;
`
const GroupWapper=styled.div`
	display:flex;
	width : 47rem;
	height: 54.4rem;
	justify-content : center;
	background-color: var(--color-gray-02);
	align-items: center;
`	
//
 

	
export default GroupEdit;