import { styled } from "styled-components";
import TodoDate from "../../components/Todo/TodoDate";

const TodoList = ({ todoList, startDate }) => {
  const dateList = [];

  for (let offset = 0; offset < 7; offset++) {
    dateList.push(startDate.clone().add(offset, "day").format("YYYY-MM-DD"));
  }

  return (
    <StyledWrapper>
      <TodoDate />
      {dateList.map((date) => (
        <TodoDate key={`todo-item-${date}`} date={date} todoList={todoList} />
      ))}
    </StyledWrapper>
  );
};

export default TodoList;

const StyledWrapper = styled.div`
  padding: 0 3.2rem 3.2rem;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 2.4rem;
`;
