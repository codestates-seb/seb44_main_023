import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoSpare.png";
import UserAvatar from "../../assets/userAvarta.png";
import { HiMiniMoon } from "react-icons/hi2";
import { MdOutlineLogout } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import Modal from "../Modal/Modal";
import Popconfirm from "../Modal/Modal";
import InputContainer  from "../Modal/Modal";
import InputWrapper  from "../Modal/Modal";
import ModalInput  from "../Input/ModalInput";
import Button  from "../Button/Button";
import { FaTrashCan } from "react-icons/fa6";

const Group = () => {
	// <InputContainer width={width}> {/*InputContainer의 width 설정*/}
	// <InputWrapper>
	// 	<InputField
	// 	size={size} // 인풋 너비 지정         
	// 	onChange={onChange} // 입력 요소의 값이 변경될 때          
	// 	fontSize={fontSize} // // 인풋 텍스트 사이즈 지정
	// 	height={height} // 인풋 높이 지정
	// 	focused={focused} // 클릭했을때 인풋의 테두리가 나오게 하는지의 여부 설정
	// 	/>
	// 	{suffix && <Suffix>{suffix}</Suffix>} {/*send 아이콘 설정*/}
	// </InputWrapper>
	// </InputContainer>

	//for test. It should be true
	const [isModalVisible, setIsModalVisible] = useState(true); 

  const handleModalVisible = () => setIsModalVisible(!isModalVisible);
  const handleCancel=()=>{};
  const handleConfirm=()=>{};
  const onChange=()=>{};
//   const size = "25rem";
//   const width = "2.5rem";
//   const height = "2.5rem";
//   const fontSize = "2.5rem";
//   const focused = true;
console.log("isModalVisible:",isModalVisible);
return (
	<>
	<button onClick={handleModalVisible}>state change </button>
	{/* <ModalInput
        // suffix={<FiSendIcon onClick={handleCommentSubmit} />}
        focused={true} // 불리언 값으로 테두리 여부 설정 가능
    /> */}
	<Modal
		id="editGroup" // 모달 id값
		open={isModalVisible} // 모달 열림 / 닫힘 state값
		closable // 우측 상단 모달 닫힘 버튼 유무 default값 : true
		onClose={handleModalVisible} // 모달 열고 닫는 state 변화 함수
	>
	<div className='group-modal'>
		<GroupContent></GroupContent>
		<button onClick={handleModalVisible}>취소</button>
	</div>
	</Modal>
	</>
  );
};
const GroupContent = () => {
	
	return(
		<GroupWapper>
		  <GroupDivCol>
			<div>
			  <div>
			  	<GroupTitle>현재 그룹명</GroupTitle>
				  <EmptyBox style={{height:"2.3rem"}}/>
				  <div>인풋자리</div>
				  <GroupDescription>그룹명을 변경 하시려면 수정을 클릭해주세요. </GroupDescription>
			  </div>
			  <EmptyBox style={{height:"3.8rem"}}/>
		  	  <div>
				<GroupTitle>친구 초대</GroupTitle>
				<div>인풋자리</div>
				<GroupInviteList>초대하려고 입력한 친구</GroupInviteList>
			  </div>
			</div>
			<GroupDivRow>
			  <Button
				label={<div><FaTrashCan/> 그룹삭제</div>} // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={() => console.log("그룹삭제")} // onClick
				fontcolor={"var(--color-white)"} // 폰트 색 변경
			  />
				{/* bordercolor={"var(--color-red-01)"} */}
 			  <Button
				label="저장하기" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={() => console.log("작은 버튼")} // onClick				fontcolor={"var(--color-white)"} // 폰트 색 변경
				fontcolor={"var(--color-white)"}
			  />
				{/* bordercolor={"var(--color-blue-03)"} */}
			</GroupDivRow>
		  </GroupDivCol>
		</GroupWapper>
	);
}
const GroupInviteList=styled.div`
display:flex;
	flex-direction : column;

	margin-top: 0.6rem;
`


const GroupDescription=styled.div`
	display:flex;
	flex-direction : column;

	margin-top: 0.9rem;
	font-size: 1.3rem;
	color: var(--color-gray-05);
`
// justify-self: center;
const GroupTitle=styled.div`
	display:flex;
	flex-direction : column;
	color: var(--color-gray-06);
  font-size: 2rem;
  justify-self: center;
`
const EmptyBox=styled.div`
	display:flex;
	width:100%;
`
// border : solid red 5px;

const GroupDivCol=styled.div`
	width:100%;
	
	display:flex;
	flex-direction : column;
	justify-content : space-between;

	
`
// border : solid red 5px;

const GroupDivRow=styled.div`
	display:flex;
	flex-direction : row;
	justify-content: space-between;
`
const GroupWapper=styled.div`
	display:flex;
	width : 47.2rem;
	height: 54.4rem;
`
// /	padding : 4.6rem  3.8rem 3.8rem 4.6rem;



export default Group;
