import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import TodoList from "../feature/Todo/TodoList";
import {
  readTodoGroup,
  readTodoGroupMember,
  readTodoList,
} from "../api/todo.api";
import moment from "moment";

const TodoPage = () => {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(moment().startOf("isoWeek"));

  const requestData = async () => {
    const groupInfo = await readTodoGroup(groupId);
    const members = await readTodoGroupMember(groupId);
    const todoList = await readTodoList(groupId);

    setGroupInfo(groupInfo);
    setMembers(members);
    setTodoList(todoList);

    setIsLoading(false);
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TodoGroup
            groupInfo={groupInfo}
            members={members}
            setStartDate={setStartDate}
          />
          <TodoList todoList={todoList} startDate={startDate} />
        </>
      )}
    </StyledWrapper>
  );
};

export default TodoPage;

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
