import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Input from "../Input/PageInput";

const PopupContainer = styled.div`
  position: fixed;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin-left: 20px;
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: -20px;
    transform: translateY(-50%);
    border-top: 12px solid transparent;
    border-right: 30px solid #fff;
    border-bottom: 12px solid transparent;
  }
`;

const Popup = ({ onClose, title, buttonPosition }) => {
  return (
    <PopupContainer
      style={{
        top: buttonPosition.top,
        left: buttonPosition.left + buttonPosition.width + 10,
      }}
    >
      <PopupTitle fontSize={12}>{title} 그룹 추가</PopupTitle>
      <StyledInput
        width="100%"
        placeholder="그룹명을 입력하세요."
        size={15}
      />
    </PopupContainer>
  );
};

const Sidebar = () => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({});
  const todoButtonRef = useRef(null);
  const accountButtonRef = useRef(null);

  const handleAddButtonClick = (title, buttonRef) => {
    setButtonPosition(buttonRef.current.getBoundingClientRect());

    if (currentPopup === title) {
      setCurrentPopup(null);
    } else {
      setCurrentPopup(title);
    }
  };

  const closePopup = () => {
    setCurrentPopup(null);
  };

  return (
    <SidebarContainer>
      <SidebarSection>
        <SidebarTitle>Todo</SidebarTitle>
        <AddButton
          onClick={() => handleAddButtonClick("Todo", todoButtonRef)}
          ref={todoButtonRef}
        >
          <FaPlus />
        </AddButton>
        {currentPopup === "Todo" && (
          <Popup
            onClose={closePopup}
            title="Todo"
            buttonPosition={buttonPosition}
          />
        )}
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>가계부</SidebarTitle>
        <AddButton
          onClick={() => handleAddButtonClick("가계부", accountButtonRef)}
          ref={accountButtonRef}
        >
          <FaPlus />
        </AddButton>
        {currentPopup === "가계부" && (
          <Popup
            onClose={closePopup}
            title="가계부"
            buttonPosition={buttonPosition}
          />
        )}
      </SidebarSection>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 6rem;
  left: 0;
  width: 80px;
  height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding: 10px;

  &:first-child {
    border-top: none;
  }
`;

const SidebarTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const AddButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #8abde7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  border: none;
  cursor: pointer;
`;

const PopupTitle = styled.div`
  font-size: ${(props) => props.fontSize}px;
`;

const StyledInput = styled(Input)`
  font-size: 60px;
`;

export default Sidebar;
