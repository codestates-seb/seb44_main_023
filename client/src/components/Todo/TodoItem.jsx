import { useState } from "react";
import { styled } from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { updateTodoStatus } from "../../api/todogroups.api";
import ModalTodo from ".//ModalTodo/ModalTodo";

const TodoItem = ({ todoInfo, todoList, setTodoList }) => {
  const { groupId } = useParams();

  const { todo_id, todo_title, todo_status } = todoInfo;

  const [checked, setChecked] = useState(todo_status === "COMPLETE");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const handleModalVisible = () =>
    setIsDetailModalVisible(!isDetailModalVisible);

  const handleCheckTodo = async (event) => {
    try {
      event.stopPropogation();
      let isCheck = checked;

      setChecked((check) => !check);

      await updateTodoStatus(
        groupId,
        todo_id,
        isCheck ? "INCOMPLETE" : "COMPLETE"
      );

      const updatedTodoList = todoList.map((todo) => {
        if (todo.todo_id === todo_id) {
          return { ...todo, todo_status: isCheck ? "INCOMPLETE" : "COMPLETE" };
        }
        return todo;
      });

      setTodoList(updatedTodoList);
    } catch (err) {
      setChecked((check) => !check);
    }
  };

  return (
    <>
      <ModalTodo
        type="detail"
        todoId={todo_id}
        isModalVisible={isDetailModalVisible}
        setIsModalVisible={setIsDetailModalVisible}
      />
      <StyledWrapper
        className={`todo-item ${checked ? "checked" : ""}`}
        onClick={handleModalVisible}
      >
        <div
          className={`todo-checkbox ${checked ? "checked" : ""}`}
          onClick={handleCheckTodo}
        >
          <AiOutlineCheck className="check-icon" />
        </div>
        <div className="todo-title">{todo_title}</div>
      </StyledWrapper>
    </>
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

  &.checked {
    background-color: var(--color-gray-03);
  }

  .todo-checkbox {
    z-index: 1;
    min-width: 2rem;
    min-height: 2rem;
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
    word-break: break-all;
  }
`;
