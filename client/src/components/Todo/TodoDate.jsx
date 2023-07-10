import { styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import TodoItem from "./TodoItem";

const TodoDate = ({ date, todoList, isDone }) => {
  return (
    <StyledWrapper>
      <div className="title">
        <div className="date">{date ? date : "NODATE"}</div>
        <div className="add-button">
          <AiOutlinePlus />
        </div>
      </div>
      <div className="todo-list">
        {todoList?.length &&
          todoList.map((item) => (
            <TodoItem
              key={`todo-list-item-${item.todo_id}`}
              isDone={true}
              todoInfo={item}
            />
          ))}
      </div>
    </StyledWrapper>
  );
};

export default TodoDate;

const StyledWrapper = styled.div`
  min-width: 25.2rem;
  padding: 0 0 1.2rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  background-color: var(--color-gray-01);

  .title {
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;

    .add-button {
      cursor: pointer;
    }
  }

  .todo-list {
    padding: 0 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;

const ListItem = styled.div`
  border-radius: 5px;
  border: 1px solid var(--color-gray-03);
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  cursor: pointer;

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
