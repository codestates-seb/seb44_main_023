import { css, styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const TodoDate = ({
  date,
  todoList,
  handleModalVisible,
  setTodoList,
  horizontal,
}) => {
  const [dataList, setDataList] = useState([]);

  const sortTodoList = () => {
    let dataIncomplete = [];
    let dataComplete = [];

    todoList?.length &&
      todoList.forEach((item) => {
        if (
          item.todo_schedule_date === date &&
          item.todo_status === "INCOMPLETE"
        )
          dataIncomplete.push(item);
        if (item.todo_schedule_date === date && item.todo_status === "COMPLETE")
          dataComplete.push(item);
      });

    setDataList([...dataIncomplete, ...dataComplete]);
  };

  useEffect(() => {
    sortTodoList();
  }, [todoList]);

  return (
    <StyledWrapper horizontal={String(horizontal)}>
      <div className="title">
        <div className="date">
          {date ? dayjs(date).locale("ko").format("MM/DD dd") : "NODATE"}
        </div>
        <div className="add-button" onClick={handleModalVisible(date)}>
          <AiOutlinePlus />
        </div>
      </div>
      {dataList?.length === 0 ? (
        <div className="empty">일정없음</div>
      ) : (
        <div className="todo-list">
          {dataList.map((item) => (
            <TodoItem
              key={`todo-list-item-${item.todo_id}`}
              todoInfo={item}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

export default TodoDate;

const StyledWrapper = styled.div`
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;
  background-color: var(--color-gray-02);
  padding: 0 0 1.2rem;

  ${({ horizontal }) =>
    horizontal === "true"
      ? css`
          width: 100%;
          max-height: 40rem;

          .empty {
            padding: 20px 40px 40px;
          }

          .todo-list {
            padding: 0 2rem;
          }
        `
      : css`
          min-width: 25.2rem;
          height: 100%;
          overflow: hidden;

          .empty {
            padding: 20px 40px 40px;
          }

          .todo-list {
            padding: 0 1.2rem;
          }
        `};

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

  .empty {
    font-size: 2rem;
    text-align: center;
  }

  .todo-list {
    max-height: calc(100% - 64px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
