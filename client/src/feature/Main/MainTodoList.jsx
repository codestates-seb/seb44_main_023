import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { readTodoList } from "../../api/todogroups.api";
import TodoDate from "../../components/Todo/TodoDate";
import ModalTodo from "../../components/Todo/ModalTodo/ModalTodo";

const MainTodoList = ({ startDate, groupId }) => {
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [date, setDate] = useState();

  const handleModalVisible = (date) => async () => {
    await setDate(date);
    setIsCreateModalVisible(!isCreateModalVisible);
  };

  const requestTodoList = async () => {
    try {
      setIsLoading(true);
      const todoList = await readTodoList(
        groupId,
        startDate.format("YYYY-MM-DD"),
        startDate.clone().subtract(3, "day").format("YYYY-MM-DD")
      );
      setTodoList(todoList);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const dateList = [];

  for (let offset = 0; offset < 3; offset++) {
    dateList.push(
      startDate.clone().subtract(offset, "day").format("YYYY-MM-DD")
    );
  }

  useEffect(() => {
    requestTodoList();
  }, []);

  if (isLoading) return null;
  return (
    <>
      <ModalTodo
        groupId={groupId}
        defaultDate={date}
        isModalVisible={isCreateModalVisible}
        setIsModalVisible={setIsCreateModalVisible}
        setTodoList={setTodoList}
      />
      <StyledWrapper>
        <TodoDate
          groupId={groupId}
          todoList={todoList}
          setTodoList={setTodoList}
          handleModalVisible={handleModalVisible}
          horizontal
        />
        {dateList.map((date) => (
          <TodoDate
            groupId={groupId}
            key={`todo-item-${date}`}
            date={date}
            todoList={todoList}
            setTodoList={setTodoList}
            handleModalVisible={handleModalVisible}
            horizontal
          />
        ))}
      </StyledWrapper>
    </>
  );
};

export default MainTodoList;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 2.4rem;
  padding-right: 1.2rem;
  max-height: calc(100% - 11.8rem);
  padding-bottom: 4rem;
`;
