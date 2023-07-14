import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import TodoList from "../feature/Todo/TodoList";
import moment from "moment";
import {
  readTodoGroup,
  readTodoList,
  readTodoGroupMember,
} from "../api/todogroups.api";
import background from "../assets/background.png";

const TodoPage = () => {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(moment().startOf("isoWeek"));

  const requestData = async () => {
    try {
      const groupInfo = await readTodoGroup(groupId);
      const members = await readTodoGroupMember(groupId);
      const todoList = await readTodoList(groupId);

      setGroupInfo(groupInfo);
      setMembers(members);
      setTodoList(todoList);

      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <P>
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
    </P>
  );
};

export default TodoPage;

const P = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
