import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Input from "../Input/PageInput";
import axios from "axios";

const PopupContainer = styled.div`
  position: fixed;
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
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

const Popup = ({
  onClose,
  title,
  buttonPosition,
  onAddButtonClick,
}) => {
  const [inputValue, setInputValue] = useState("");
  const popupRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  const handleAddButtonClick = async () => {
    if (inputValue.trim() !== "") {
      try {

        if (title === "Todo") {
          const response = await axios.post("/api/todogroups", {
            todo_group_title: inputValue,
          });
          const todoGroup = response.data;
          onAddButtonClick(todoGroup.todo_group_title);
        } else if (title === "가계부") {
          const response = await axios.post("/api/ledgergroups", {
            ledger_group_title: inputValue,
          });
          const ledgerGroup = response.data;
          onAddButtonClick(ledgerGroup.ledger_group_title);
        }
        setInputValue("");
        onClose();
      } catch (error) {
        console.error(error);
      } 
    }
  };

  return (
    <>
      {title && <PopupOverlay onClick={onClose} />}
      <PopupContainer
        ref={popupRef}
        style={{
          top: buttonPosition.top,
          left: buttonPosition.left + buttonPosition.width + 10,
        }}
      >
        <PopupTitle fontSize={12}>{title} 그룹 추가</PopupTitle>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          width="100%"
          placeholder="그룹명을 입력하세요."
          size={17}
          fontSize={1.2}
          minLength={2}
          maxLength={7}
        />
      </PopupContainer>
    </>
  );
};

const Sidebar = () => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({});
  const todoButtonRef = useRef(null);
  const accountButtonRef = useRef(null);
  const [todoButtons, setTodoButtons] = useState([]);
  const [accountButtons, setAccountButtons] = useState([]);

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

  const handleAddButton = (text) => {
    if (currentPopup === "Todo") {
      setTodoButtons((prevButtons) => [
        ...prevButtons,
        {
          id: Date.now(),
          text,
        },
      ]);
    } else if (currentPopup === "가계부") {
      setAccountButtons((prevButtons) => [
        ...prevButtons,
        {
          id: Date.now(),
          text,
        },
      ]);
    }
    setCurrentPopup(null);
  };

  return (
    <SidebarContainer>
      <SidebarSection>
        <SidebarTitle>Todo</SidebarTitle>
        {todoButtons.map((button) => (
          <AddedButton key={button.id}>{button.text}</AddedButton>
        ))}
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
            onAddButtonClick={handleAddButton}
          />
        )}
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>가계부</SidebarTitle>
        {accountButtons.map((button) => (
          <AddedButton key={button.id}>{button.text}</AddedButton>
        ))}
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
            onAddButtonClick={handleAddButton}
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
  font-size: 16px;
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
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--color-blue-03);
  }
`;

const PopupOverlay = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
`;

const PopupTitle = styled.div`
  font-size: ${(props) => props.fontSize}px;
  margin-bottom: 4px;
  color: var(--color-gray-07);
`;

const AddedButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--color-blue-02);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-03);
  }
`;

export default Sidebar;
