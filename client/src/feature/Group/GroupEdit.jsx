import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/PageInput";
import { FaTrashCan } from "react-icons/fa6";

import { useGroupMemberStore } from "../../store/store.groupMember"; 
import { useGroupTitleStore ,useGetGroupTitle} from "../../store/store.grouptitle"; 

const GroupEdit = () => {
	//const [inputGroupTitle, setInpuGroupTitle] = useState('');
	//const [inputGroupMember, setInputGroupMembere] = useState('');

	const { groupTitle, setGroupTitle } = useGroupTitleStore();
	const { groupMembers, setGroupMembers, addGroupMember } = useGroupMemberStore();
	
	const newtitle = useGetGroupTitle();
	console.log("in useGetGroupTitle : ",newtitle )

	const handleKeyDown = (event) => {
		console.log("in handleKeyDown1 : ",event.target.value )
		if (event.key === 'Enter') {
		  setGroupTitle(event.target.value);
		}
	  };
	  
	  const handleGroupTitleChange = (event) => {
		if (event.key === 'Enter') {
			setGroupTitle(event.target.value);
		  }
		setGroupTitle(event.target.value);
	  };
	
	const handleMemberChange =()=>{}

	const handleSubmitSave =()=>{
		console.log("작은 버튼 handleSubmitSave")
		setGroupTitle(groupTitle)
	}
	const handleSubmitCancle =()=>{
		console.log("그룹삭제")
		setGroupTitle("")
	}

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
					placeHolder=" Group1"//추후 설정을누른 그룹의 이름을 받아오는 로직으로 변경필요
					fontSize={2}
					value={groupTitle}
				/>					
			
			<GroupDescription>그룹명을 변경 하시려면 수정을 클릭해주세요. </GroupDescription>
			<EmptyBox style={{height:"3.8rem"}}/>
			<GroupTitle>친구 초대</GroupTitle>
			<EmptyBox style={{height:"1.8rem"}}/>
			<Input
				width={38.6}//"300px"//투명박스 px
				height={3}//"30px"//투명박스px
				size={38.6}//"386px" //가로길이 px
				placeHolder=" 이메일을 입력해주세요"
				fontSize={1.6} //인풋에쓰여지는 텍스트싸이즈
				onChange={handleMemberChange}
			/>
			{/* <div style={{border:"solid red 5px"}}>
			<input
					type="text"
					value={groupTitle}
					onChange={handleMemberChange}
					onKeyDown={handleKeyDown}
					/>
			</div> */}
			<EmptyBox style={{height:"0.6rem"}}/>

			<GroupInviteList>초대될친구 리스트 보여줄 부분</GroupInviteList>
		  </div>

			<GroupDivRow>
				<Button
				label={<div><FaTrashCan/> 그룹삭제</div>} // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={ handleSubmitCancle} // onClick
				fontcolor={"var(--color-white)"} // 폰트 색 변경
				backgroundColor={"var(--color-red-01)"} // 배경색 변경
				bordercolor={"var(--color-red-01)"} // 배경색 변경
				
				/>
				<Button
				label="저장하기" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={handleSubmitSave} // onClick				
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
	background-color: var(--color-white);
	align-items: center;
`	
//
 

	
export default GroupEdit;