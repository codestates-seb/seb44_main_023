import dayjs from "dayjs";
import { styled } from "styled-components";
import GroupInfo from "../../components/Group/GroupInfo";
import useQueryTodoGroup from "../../query/todogroup.query";
import MainTodoList from "./MainTodoList";

const MainTodo = ({ groupId }) => {
  const { isLoading, data } = useQueryTodoGroup({ groupId });

  if (isLoading) return <StyledWrapper />;

  const { groupInfo, members } = data;
  return (
    <StyledWrapper>
      <GroupInfo title={groupInfo.todo_group_title} members={members} />
      <MainTodoList startDate={dayjs()} groupId={groupId} />
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
