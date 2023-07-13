import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Popup from "./SidbarPoup";

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
  width: 8rem;
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
  padding: 1rem;

  &:first-child {
    border-top: none;
  }
`;

const SidebarTitle = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
`;

const AddButton = styled.button`
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 50%;
  background-color: #8abde7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--color-blue-03);
  }
`;

const AddedButton = styled.button`
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 50%;
  background-color: var(--color-blue-02);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-03);
  }
`;

export default Sidebar;
