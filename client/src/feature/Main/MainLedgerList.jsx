import { styled } from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LedgerBook from "../../components/LedgerBook/LedgerBook";
import useQueryLedgerList from "../../query/ledgerList.query";

const MainLedgerList = ({ groupId }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));

  const { isLoading, data } = useQueryLedgerList({
    groupId,
    startDate: selectedMonth.clone().startOf("month").format("YYYY-MM-DD"),
    endDate: selectedMonth.clone().endOf("month").format("YYYY-MM-DD"),
  });

  if (isLoading) return null;
  return (
    <LedgerList
      groupId={groupId}
      data={data}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
    />
  );
};

const LedgerList = ({ groupId, data, selectedMonth, setSelectedMonth }) => {
  const [ledgerList, setLedgerList] = useState(data);

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

  useEffect(() => {
    setLedgerList(data);
  }, [data]);

  return (
    <StyledWrapper>
      <LedgerBook
        groupId={groupId}
        ledgerList={ledgerList}
        setLedgerList={setLedgerList}
        handleSelectedMonth={handleSelectedMonth}
        selectedMonth={selectedMonth}
        isMain={true}
      />
    </StyledWrapper>
  );
};

export default MainLedgerList;

const StyledWrapper = styled.div`
  max-height: calc(100% - 11.8rem);
  height: 100%;
`;
