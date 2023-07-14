import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { readTodoList } from "../../api/todogroups.api";
import { TodoListContext } from "../../App";
import TodoDate from "../../components/Todo/TodoDate";

const TodoList = ({ startDate }) => {
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { groupId } = useParams();

  const requestTodoList = async () => {
    try {
      setIsLoading(true);
      const todoList = await readTodoList(groupId);
      setTodoList(todoList);
      setIsLoading(false);
    } catch (err) {}
  };

  const dateList = [];

  for (let offset = 0; offset < 7; offset++) {
    dateList.push(startDate.clone().add(offset, "day").format("YYYY-MM-DD"));
  }

  useEffect(() => {
    requestTodoList();
  }, []);

  if (isLoading) return null;
  return (
    <TodoListContext.Provider value={requestTodoList}>
      <StyledWrapper>
        <TodoDate todoList={todoList} />
        {dateList.map((date) => (
          <TodoDate key={`todo-item-${date}`} date={date} todoList={todoList} />
        ))}
      </StyledWrapper>
    </TodoListContext.Provider>
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
