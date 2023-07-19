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
import ButtonFloating from "../Button/ButtonFloating";
import { useGroupEditStore } from "../../store/store.groupEdit";

const Group=()=>{

//const [groupTitle, setGroupTitle]=useState("Group 1")
//const [isEditMode, setEditMode] = useState(true); 
const { isEditMode,setIsEditMode,  groupTitle, setGroupTitle } = useGroupEditStore();


const handleEditMode = () => {
	setIsEditMode(!isEditMode)
};

console.log("isModalVisible:",isEditMode);

return (
	<>
	{/* for test */}
	<div style={{fontSize:"10rem"}}>{groupTitle}</div>
	<ButtonWrapper>
          <ButtonFloating icon="setting" onClick={handleEditMode}/>
    </ButtonWrapper>
	
	<GroupEditModal
		id="editGroup" // 모달 id값
		open={isEditMode} // 모달 열림 / 닫힘 state값
		closable // 우측 상단 모달 닫힘 버튼 유무 default값 : true
		onClose={handleEditMode} // 모달 열고 닫는 state 변화 함수
	>
		<GroupEdit></GroupEdit>
	</GroupEditModal>
	</>
  );
};
// /	padding : 4.6rem  3.8rem 3.8rem 4.6rem;


const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  gap: 1.2rem;
`;

const GroupEditModal = styled(Modal)`	
`
export default Group;
