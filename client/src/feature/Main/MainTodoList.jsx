import { useState } from "react";
import { styled } from "styled-components";
import TodoDate from "../../components/Todo/TodoDate";
import ModalTodo from "../../components/Todo/ModalTodo/ModalTodo";
import useQueryTodoList from "../../query/todoList.query";

const MainTodoList = ({ startDate, groupId }) => {
  const { isLoading, data } = useQueryTodoList({
    groupId,
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: startDate.clone().subtract(3, "day").format("YYYY-MM-DD"),
  });

  if (isLoading) return null;
  return <List data={data} groupId={groupId} startDate={startDate} />;
};

const List = ({ groupId, data, startDate }) => {
  const [date, setDate] = useState();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [todoList, setTodoList] = useState(data);

  const handleModalVisible = (date) => async () => {
    await setDate(date);
    setIsCreateModalVisible(!isCreateModalVisible);
  };

  const dateList = [];

  for (let offset = 0; offset < 3; offset++) {
    dateList.push(
      startDate.clone().subtract(offset, "day").format("YYYY-MM-DD")
    );
  }

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
