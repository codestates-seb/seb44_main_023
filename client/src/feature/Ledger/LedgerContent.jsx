import { useEffect, useState } from "react";
import { styled } from "styled-components";
import FloatingButton from "../../components/Button/ButtonFloating";
import useQueryLedgerList from "../../query/ledgerList.query";
import LedgerCalendar from "./LedgerCalendar/LedgerCalendar";
import LedgerList from "./LedgerList/LedgerList";
import dayjs from "dayjs";
import GroupEdit from "../../components/GroupEdit/GroupEdit";
import { ledgerMode } from "../../utils/util";
import { useGroupEditStore } from "../../store/store.groupEdit";

const LedgerContent = ({ pageType, groupId, groupInfo }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));

  const { isLoading, data } = useQueryLedgerList({
    groupId,
    startDate: selectedMonth.clone().startOf("month").format("YYYY-MM-DD"),
    endDate: selectedMonth.clone().endOf("month").format("YYYY-MM-DD"),
  });

  if (isLoading) return null;
  return (
    <Content
      groupInfo={groupInfo}
      groupId={groupId}
      pageType={pageType}
      data={data}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
    />
  );
};

const Content = ({
  groupInfo,
  groupId,
  pageType,
  data,
  selectedMonth,
  setSelectedMonth,
}) => {
  const [ledgerList, setLedgerList] = useState(data);

  useEffect(() => {
    setLedgerList(data);
  }, [data]);

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
  const { ledger_group_title } = groupInfo;
  console.log("Ledger groupInfo", groupInfo);

  const {
    mode,
    isModalVisible,
    setMode,
    setIsModalVisible,
    groupTitle,
    setGroupTitle,
  } = useGroupEditStore();
  console.log("Ledger", ledger_group_title);

  const handleIsEditModalVisible = () => {
    setIsModalVisible(!isModalVisible);
    setGroupTitle(ledger_group_title);
    setMode(ledgerMode);
    console.log("groupTitle", groupTitle);
    console.log("ledgerMode", mode);
  };

  return (
    <StyledWrapper>
      {pageType === "calendar" ? (
        <LedgerCalendar
          groupId={groupId}
          ledgerList={ledgerList}
          selectedMonth={selectedMonth}
          handleSelectedMonth={handleSelectedMonth}
        />
      ) : (
        <LedgerList
          groupId={groupId}
          ledgerList={ledgerList}
          setLedgerList={setLedgerList}
          selectedMonth={selectedMonth}
          handleSelectedMonth={handleSelectedMonth}
        />
      )}
      <ButtonWrapper>
        <FloatingButton
          icon="plus"
          // onClick={handleModalVisible(dayjs().format("YYYY-MM-DD"))}
        />
        <FloatingButton icon="setting" onClick={handleIsEditModalVisible} />
        <GroupEdit />
      </ButtonWrapper>
    </StyledWrapper>
  );
};
export default LedgerContent;

const StyledWrapper = styled.div`
  height: 100%;
  max-height: calc(100% - 15.2rem);
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  gap: 1.2rem;
`;
