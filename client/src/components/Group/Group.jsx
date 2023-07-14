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
import GroupEdit from "../../feature/Group/GroupEdit"

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
		<GroupEdit></GroupEdit>
	</div>
	</Modal>
	</>
  );
};
// /	padding : 4.6rem  3.8rem 3.8rem 4.6rem;



export default Group;
