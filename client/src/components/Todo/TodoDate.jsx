import { styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

const TodoDate = ({ date, todoList }) => {
  const [dataSet, setDataSet] = useState(todoList);
  const [dataList, setDataList] = useState([]);

  const sortTodoList = () => {
    let dataIncomplete = [];
    let dataComplete = [];

    dataSet?.length &&
      dataSet.forEach((item) => {
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
  }, [dataSet]);

  return (
    <StyledWrapper>
      <div className="title">
        <div className="date">{date ? date : "NODATE"}</div>
        <div className="add-button">
          <AiOutlinePlus />
        </div>
      </div>
      <div className="todo-list">
        {dataList.map((item) => (
          <TodoItem
            key={`todo-list-item-${item.todo_id}`}
            todoInfo={item}
            todoList={dataSet}
            setTodoList={setDataSet}
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
  height: 100%;
  overflow: hidden;

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
    max-height: calc(100% - 64px);
    overflow-y: auto;
    padding: 0 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
