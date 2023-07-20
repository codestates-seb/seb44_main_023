import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { readTodoList } from "../../api/todogroups.api";
import TodoDate from "../../components/Todo/TodoDate";
import ButtonFloating from "../../components/Button/ButtonFloating";
import dayjs from "dayjs";
import ModalTodo from "../../components/Todo/ModalTodo/ModalTodo";

const TodoList = ({ startDate }) => {
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [date, setDate] = useState();

  const handleModalVisible = (date) => async () => {
    await setDate(date);
    setIsCreateModalVisible(!isCreateModalVisible);
  };

  const { groupId } = useParams();

  const requestTodoList = async () => {
    try {
      setIsLoading(true);
      const todoList = await readTodoList(
        groupId,
        startDate.format("YYYY-MM-DD"),
        startDate.clone().add(7, "day").format("YYYY-MM-DD")
      );
      setTodoList(todoList);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
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
          todoList={todoList}
          setTodoList={setTodoList}
          handleModalVisible={handleModalVisible}
          groupId={groupId}
        />
        {dateList.map((date) => (
          <TodoDate
            groupId={groupId}
            key={`todo-item-${date}`}
            date={date}
            todoList={todoList}
            setTodoList={setTodoList}
            handleModalVisible={handleModalVisible}
          />
        ))}
        <ButtonWrapper>
          <ButtonFloating
            icon="plus"
            onClick={handleModalVisible(dayjs().format("YYYY-MM-DD"))}
          />
          <ButtonFloating icon="setting" />
        </ButtonWrapper>
      </StyledWrapper>
    </>
  );
};

export default TodoList;

const StyledWrapper = styled.div`
  padding: 0 3.2rem 3.2rem;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2.4rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  gap: 1.2rem;
`;
