import { useState } from "react";
import { styled } from "styled-components";
import FloatingButton from "../../components/Button/ButtonFloating";
import useQueryLedgerList from "../../query/ledgerList.query";
import LedgerCalendar from "./LedgerCalendar/LedgerCalendar";
import LedgerList from "./LedgerList/LedgerList";
import dayjs from "dayjs";

const LedgerContent = ({ pageType, groupId }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));

  const { isLoading, data } = useQueryLedgerList({
    groupId,
    startDate: selectedMonth.clone().startOf("month").format("YYYY-MM-DD"),
    endDate: selectedMonth.clone().endOf("month").format("YYYY-MM-DD"),
  });

  if (isLoading) return null;
  return (
    <Content
      pageType={pageType}
      data={data}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
    />
  );
};

const Content = ({ pageType, data, selectedMonth, setSelectedMonth }) => {
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

  return (
    <StyledWrapper>
      {pageType === "calendar" ? (
        <LedgerCalendar
          ledgerList={data}
          selectedMonth={selectedMonth}
          handleSelectedMonth={handleSelectedMonth}
        />
      ) : (
        <LedgerList
          ledgerList={data}
          selectedMonth={selectedMonth}
          handleSelectedMonth={handleSelectedMonth}
        />
      )}
      <ButtonWrapper>
        <FloatingButton
          icon="plus"
          // onClick={handleModalVisible(dayjs().format("YYYY-MM-DD"))}
        />
        <FloatingButton icon="setting" />
      </ButtonWrapper>
    </StyledWrapper>
  );
};
export default LedgerContent;

const StyledWrapper = styled.div``;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  gap: 1.2rem;
`;
