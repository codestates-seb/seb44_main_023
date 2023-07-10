import { useState } from "react";
import { styled } from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const TodoItem = ({ todoInfo, isDone }) => {
  const [checked, setChecked] = useState(isDone);

  const handleCheck = () => setChecked(!checked);

  return (
    <StyledWrapper>
      <div
        className={`todo-checkbox ${checked ? "checked" : ""}`}
        onClick={handleCheck}
      >
        <AiOutlineCheck className="check-icon" />
      </div>
      <div className="todo-title">{todoInfo.todo_title}</div>
    </StyledWrapper>
  );
};

export default TodoItem;

const StyledWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid var(--color-gray-03);
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  cursor: pointer;
  height: 100%;

  .todo-checkbox {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: 1px solid var(--color-blue-03);
    color: var(--color-blue-03);
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.2rem;

    .check-icon {
      display: none;
    }

    &.checked {
      .check-icon {
        display: block;
      }
    }
  }

  .todo-title {
    font-size: 1.6rem;
  }
`;
