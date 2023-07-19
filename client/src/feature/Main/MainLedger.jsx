import { styled } from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  readLedgerGroup,
  readLedgerGroupMember,
  readLedgerList,
} from "../../api/ledgergroups.api";
import GroupInfo from "../../components/Group/GroupInfo";
import LedgerBook from "../../components/LedgerBook/LedgerBook";

const MainLedger = ({ groupId }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [ledgerList, setLedgerList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedMonth = (type) => () => {
    switch (type) {
      case "PREV":
        setSelectedMonth((selectedMonth) =>
          selectedMonth.clone().subtract(1, "month")
        );
        break;
      case "TODAY":
        setSelectedMonth(dayjs().locale("ko"));
        break;
      case "NEXT":
        setSelectedMonth((selectedMonth) =>
          selectedMonth.clone().add(1, "month")
        );
        break;
      default:
        break;
    }
  };

  const requestLedgerInfo = async () => {
    try {
      const groupInfo = await readLedgerGroup(groupId);
      const members = await readLedgerGroupMember(groupId);
      setGroupInfo(groupInfo);
      setMembers(members);
    } catch (err) {
      console.log(err);
    }
  };

  const requestLedgerList = async () => {
    try {
      const ledgerList = await readLedgerList(
        1,
        selectedMonth.clone().startOf("month").format("YYYY-MM-DD"),
        selectedMonth.clone().endOf("month").format("YYYY-MM-DD")
      );
      setLedgerList(ledgerList);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestLedgerInfo();
  }, [selectedMonth]);

  useEffect(() => {
    if (groupInfo) requestLedgerList();
  }, [groupInfo]);

  return (
    <StyledWrapper>
      {!isLoading && (
        <>
          <GroupInfo title={groupInfo?.ledger_group_title} members={members} />
          <LedgerBookWrapper>
            <LedgerBook
              ledgerList={ledgerList}
              handleSelectedMonth={handleSelectedMonth}
              selectedMonth={selectedMonth}
              isMain={true}
            />
          </LedgerBookWrapper>
        </>
      )}
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

const LedgerBookWrapper = styled.div`
  max-height: calc(100% - 11.8rem);
  height: 100%;
`;
