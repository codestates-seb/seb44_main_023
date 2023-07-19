import React from "react";
import styled from "styled-components";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai"
import { HiPlus } from "react-icons/hi";

export default function FloatingButton(props) {
  const { icon, onClick } = props;

  let selectedIcon = null;

  switch (icon) {
    case "plus":
      selectedIcon = <HiPlus size={30} style={{ color: "var(--color-gray-07)" }}/>;
      break;
    case "setting":
      selectedIcon = <AiOutlineSetting size={30} style={{ color: "var(--color-gray-07)" }}/>;
      break;
    case "hide":
      selectedIcon = <FaEyeSlash size={25} style={{ color: "var(--color-gray-07)" }}/>;
      
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
  width: 4.8rem;
  height: 4.8rem;
  background-color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;
