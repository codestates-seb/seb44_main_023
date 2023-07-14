import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import TodoList from "../feature/Todo/TodoList";
import moment from "moment";
import { readTodoGroup, readTodoGroupMember } from "../api/todogroups.api";
import Layout from "../Layout/PagesLayout";

const TodoPage = () => {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(moment().startOf("isoWeek"));

  const requestData = async () => {
    try {
      const groupInfo = await readTodoGroup(groupId);
      const members = await readTodoGroupMember(groupId);
      setGroupInfo(groupInfo);
      setMembers(members);

      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <Layout>
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
            <TodoList startDate={startDate} />
          </>
        )}
      </StyledWrapper>
    </Layout>
  );
};

export default TodoPage;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
