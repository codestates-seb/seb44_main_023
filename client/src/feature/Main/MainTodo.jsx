import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../../components/Button/Button";
import GroupInfo from "../../components/Group/GroupInfo";
import useQueryTodoGroup from "../../query/todogroup.query";
import MainTodoList from "./MainTodoList";

const MainTodo = ({ groupId }) => {
  const { isLoading, data } = useQueryTodoGroup({ groupId });
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/profile/1");
  };

  if (isLoading) return <StyledWrapper />;
  else if (!data?.groupInfo)
    return (
      <StyledWrapper>
        <Empty>
          <div className="empty-text">대표 TODO 그룹이 없습니다.</div>
          <Button
            label="설정하러가기"
            size="medium"
            onClick={handleAddButton}
            style={{ backgroundColor: "var(--color-blue-03)" }}
          />
        </Empty>
      </StyledWrapper>
    );

  const { groupInfo, members } = data;
  return (
    <StyledWrapper>
      <GroupInfo title={groupInfo?.todo_group_title} members={members} />
      <MainTodoList startDate={dayjs()} groupId={groupId} />
    </StyledWrapper>
  );
};

export default MainTodo;

const StyledWrapper = styled.div`
  width: 50%;
  padding: 6.4rem 2.4rem 0 6.4rem;
  position: relative;

  .group-info {
    margin-bottom: 4rem;
  }
`;

const Empty = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-bottom: 6.4rem;

  .empty-text {
    font-size: 2.4rem;
    margin-bottom: 4rem;
  }
`;
