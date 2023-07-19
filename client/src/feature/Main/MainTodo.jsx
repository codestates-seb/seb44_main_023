import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { readTodoGroup, readTodoGroupMember } from "../../api/todogroups.api";
import GroupInfo from "../../components/Group/GroupInfo";
import MainTodoList from "./MainTodoList";

const MainTodo = ({ groupId }) => {
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const requestData = async () => {
    try {
      const groupInfo = await readTodoGroup(1);
      const members = await readTodoGroupMember(1);
      setGroupInfo(groupInfo);
      setMembers(members);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <StyledWrapper>
      {!isLoading && (
        <>
          <GroupInfo title={groupInfo.todo_group_title} members={members} />
          <MainTodoList startDate={dayjs()} groupId={groupId} />
        </>
      )}
    </StyledWrapper>
  );
};

export default MainTodo;

const StyledWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 6.4rem 2.4rem 0 6.4rem;
  position: relative;
  overflow: show;

  .group-info {
    margin-bottom: 4rem;
  }
`;
