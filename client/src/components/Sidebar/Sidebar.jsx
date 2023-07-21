import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import Popup from "./SidbarPoup";
import { useNavigate } from "react-router-dom";
import { readAllTodoGroups } from "../../api/todogroups.api";
import { readAllLedgerGroups } from "../../api/ledgergroups.api";

const Sidebar = () => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({});
  const todoButtonRef = useRef(null);
  const accountButtonRef = useRef(null);
  const navigate = useNavigate();

  const [todoGroups, setTodoGroups] = useState([]);
  const [ledgerGroups, setLedgerGroups] = useState([]);

  useEffect(() => {
    const readGroups = async () => {
      try {
        const todoGroupsData = await readAllTodoGroups();
        setTodoGroups(todoGroupsData);

        const ledgerGroupsData = await readAllLedgerGroups();
        setLedgerGroups(ledgerGroupsData);
      } catch (error) {
        console.error(error);
      }
    };

    readGroups();
  }, []);

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
      const newTodoGroup = {
        todo_group_id: Date.now(),
        todo_group_title: text,
      };
      setTodoGroups((prevGroups) => [...prevGroups, newTodoGroup]);
    } else if (currentPopup === "가계부") {
      const newLedgerGroup = {
        ledger_group_id: Date.now(),
        ledger_group_title: text,
      };
      setLedgerGroups((prevGroups) => [...prevGroups, newLedgerGroup]);
    }
    setCurrentPopup(null);
  };

  const handleButtonClick = (groupId, groupType) => {
    if (groupType === "Todo") {
      navigate(`/todo/${groupId}`);
    } else if (groupType === "가계부") {
      navigate(`/ledger/${groupId}?type=list`);
    }
  };

  return (
    <SidebarContainer>
      <TodoSidebarSection>
        <SidebarTitle>Todo</SidebarTitle>
        <AddedButtonContainer>
          {todoGroups.map((group) => (
            <AddedButton
              key={group.todo_group_id}
              onClick={() => handleButtonClick(group.todo_group_id, "Todo")}
            >
              {group.todo_group_title}
            </AddedButton>
          ))}

          <AddButton
            onClick={() => handleAddButtonClick("Todo", todoButtonRef)}
            ref={todoButtonRef}
          >
            <FaPlus />
          </AddButton>
        </AddedButtonContainer>
        {currentPopup === "Todo" && (
          <Popup
            onClose={closePopup}
            title="Todo"
            buttonPosition={buttonPosition}
            onAddButtonClick={handleAddButton}
          />
        )}
      </TodoSidebarSection>

      <LedgerSidebarSection>
        <SidebarTitle>가계부</SidebarTitle>
        <AddedButtonContainer>
          {ledgerGroups.map((group) => (
            <AddedButton
              key={group.ledger_group_id}
              onClick={() => handleButtonClick(group.ledger_group_id, "가계부")}
            >
              {group.ledger_group_title}
            </AddedButton>
          ))}

          <AddButton
            onClick={() => handleAddButtonClick("가계부", accountButtonRef)}
            ref={accountButtonRef}
          >
            <FaPlus />
          </AddButton>
        </AddedButtonContainer>
        {currentPopup === "가계부" && (
          <Popup
            onClose={closePopup}
            title="가계부"
            buttonPosition={buttonPosition}
            onAddButtonClick={handleAddButton}
          />
        )}
      </LedgerSidebarSection>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 6rem;
  left: 0;
  width: 8rem;
  height: 100vh;
  padding-bottom: 8rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 99;
`;

const TodoSidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding-top: 1rem;
  max-height: 46.5rem;

  &:first-child {
    border-top: none;
  }
`;

const LedgerSidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  max-height: 50rem;

  &:first-child {
    border-top: none;
  }
`;

const AddedButtonContainer = styled.div`
  overflow-y: auto;
  padding-right: 1px;
  scrollbar-width: thin;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const SidebarTitle = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
  color: var(--color-gray-07);
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
  font-size: 1.1rem;
  border: none;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--color-blue-03);
    border: 2px solid var(--color-blue-02);
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
  font-size: 1.1rem;
  color: var(--color-gray-07);
  font-weight: bolder;
  cursor: pointer;
  border: 2px solid #a8d6fc;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-blue-03);
    border: 2px solid var(--color-blue-02);
  }
`;

export default Sidebar;
