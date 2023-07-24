import { styled } from "styled-components";
import GroupInfo from "../../components/Group/GroupInfo";
import MainLedgerList from "./MainLedgerList";
import useQueryLedgerGroup from "../../query/ledgergroup.query";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const MainLedger = ({ groupId }) => {
  const { isLoading, data } = useQueryLedgerGroup({ groupId });
  const navigate = useNavigate();

  const handleAddButton = () => {
    navigate("/profile");
  };

  if (isLoading) return <StyledWrapper />;
  else if (!data?.groupInfo)
    return (
      <StyledWrapper>
        <Empty>
          <div className="empty-text">대표 가계부 그룹이 없습니다.</div>
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
      <GroupInfo
        title={groupInfo?.ledger_group_title}
        members={members.members}
      />
      <MainLedgerList groupId={groupId} />
    </StyledWrapper>
  );
};

export default MainLedger;

const StyledWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 6.4rem 6.4rem 0 2.4rem;

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
