import { styled } from "styled-components";
import GroupInfo from "../../components/Group/GroupInfo";
import MainLedgerList from "./MainLedgerList";
import useQueryLedgerGroup from "../../query/ledgergroup.query";

const MainLedger = ({ groupId }) => {
  const { isLoading, data } = useQueryLedgerGroup({ groupId });

  if (isLoading || !data?.groupInfo) return <StyledWrapper />;

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
