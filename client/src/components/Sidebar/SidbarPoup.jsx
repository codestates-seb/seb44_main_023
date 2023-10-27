import React, { useState, useRef } from "react";
import styled from "styled-components";
import Input from "../Input/PageInput";
import { createTodoGroup } from "../../api/todogroups.api";
import { createLedgerGroup } from "../../api/ledgergroups.api";
import useUserInfoStore from "../../store/store.userInfo";

const Popup = ({ onClose, title, buttonPosition, onAddButtonClick }) => {
  const [inputValue, setInputValue] = useState("");
  const popupRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  const { userInfo } = useUserInfoStore();

  const handleAddButtonClick = async () => {
    if (inputValue.trim() !== "") {
      try {
        if (title === "Todo") {
          const todoGroup = await createTodoGroup(
            inputValue
          );
          onAddButtonClick(todoGroup.todo_group_title, todoGroup.todo_group_id);
        } else if (title === "가계부") {
          const ledgerGroup = await createLedgerGroup(
            inputValue
          );
          onAddButtonClick(
            ledgerGroup.ledger_group_title,
            ledgerGroup.ledger_group_id
          );
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

const PopupContainer = styled.div`
  position: fixed;
  background-color: #fff;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
  margin-left: 2rem;
  &::before {
    content: "";
    position: absolute;
    top: 2rem;
    left: -2rem;
    transform: translateY(-50%);
    border-top: 1.2rem solid transparent;
    border-right: 3rem solid #fff;
    border-bottom: 1.2rem solid transparent;
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
  margin-bottom: 0.4rem;
  color: var(--color-gray-07);
`;

export default Popup;
