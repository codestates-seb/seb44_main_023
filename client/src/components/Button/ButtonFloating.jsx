import React from "react";
import styled from "styled-components";
import { FaPlus, FaCog } from "react-icons/fa";

export default function FloatingButton(props) {
  const { icon, onClick } = props;

  let selectedIcon = null;

  switch (icon) {
    case "plus":
      selectedIcon = <FaPlus />;
      break;
    case "setting":
      selectedIcon = <FaCog />;
      break;

    default:
      selectedIcon = null;
  }

  return (
    <StyledFloatingButton onClick={onClick}>
      {selectedIcon}
    </StyledFloatingButton>
  );
}

const StyledFloatingButton = styled.button`
  /* position: fixed; */
  bottom: 1.25rem;
  right: 1.25rem;
  width: 3.125rem;
  height: 3.125rem;
  background-color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
