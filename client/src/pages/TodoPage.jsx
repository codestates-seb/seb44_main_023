import { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import useQueryTodoGroup from "../query/todogroup.query";
import TodoList from "../feature/Todo/TodoList";

const TodoPage = () => {
  const { groupId } = useParams();
  const [startDate, setStartDate] = useState(
    dayjs().locale("ko").startOf("week").add(1, "day")
  );

  const { isLoading, data } = useQueryTodoGroup({ groupId });

  if (isLoading)
    return (
      <StyledWrapper>
        <Loading />
      </StyledWrapper>
    );

  const { groupInfo, members } = data;
  return (
    <StyledWrapper>
      <TodoGroup
        groupInfo={groupInfo}
        members={members}
        setStartDate={setStartDate}
      />
      <TodoList startDate={startDate} />
    </StyledWrapper>
  );
};

export default TodoPage;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
