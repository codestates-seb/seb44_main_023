import React, { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import dayjs from "dayjs";
import Modal from "../../../components/Modal/Modal";
import LegerDetailModal from "../LedgerCalendar/LegerDetailModal/LegerDetailModal";

const LedgerCalendar = ({
  ledgerList,
  selectedMonth,
  handleSelectedMonth,
  groupId,
  fetchData,
}) => {
  const currentDate = new Date(selectedMonth.format("YYYY-MM-DD"));

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [day, setDay] = useState(currentDate.getDate());

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (date) => {
    const formattedDate = dayjs(new Date(year, month, date)).format(
      "YYYY-MM-DD"
    );
    setSelectedDate(formattedDate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dates = [];
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dates.push(i);
  }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const previousMonthDates = [];
  if (firstDayOfWeek !== 0) {
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      previousMonthDates.push(previousMonthLastDay - i);
    }
  }

  const nextMonthDates = [];
  const lastDayOfWeek = new Date(year, month + 1, 1).getDay();
  if (lastDayOfWeek !== 0) {
    for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
      nextMonthDates.push(i);
    }
  }

  const isSaturday = (day) => day % 7 === 6;
  const isSunday = (day) => day % 7 === 0;

  useEffect(() => {
    const currentDate = new Date(selectedMonth.format("YYYY-MM-DD"));
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
    setDay(currentDate.getDate());
  }, [selectedMonth]);

  const calculateTotalIncomeAndExpense = (date) => {
    const filteredData = ledgerList.filter(
      (item) =>
        item.ledger_schedule_date ===
        dayjs(new Date(year, month, date)).format("YYYY-MM-DD")
    );

    let totalIncome = 0;
    let totalExpense = 0;

    filteredData.forEach((item) => {
      if (item.inoutcome?.inoutcomeId === 1) {
        totalExpense += item.ledger_amount;
      } else if (item.inoutcome?.inoutcomeId === 2) {
        totalIncome += item.ledger_amount;
      }
    });

    return { totalIncome, totalExpense };
  };

  return (
    <CenteredContainer>
      <StyledWrapper>
        <CalendarHeader>
          <Movement>
            <Button onClick={handleSelectedMonth("PREV")}>
              <AiOutlineLeft />
            </Button>
            <Month>{selectedMonth.format("M")}월</Month>
            <Button onClick={handleSelectedMonth("NEXT")}>
              <AiOutlineRight />
            </Button>
          </Movement>
          <ThisMonthButton onClick={handleSelectedMonth("TODAY")}>
            이번 달
          </ThisMonthButton>
        </CalendarHeader>
        <CalendarWrapper>
          <CalendarGrid>
            {daysOfWeek.map((day) => (
              <DayOfWeek key={day} $day={day}>
                {day}
              </DayOfWeek>
            ))}

            {previousMonthDates.map((date) => (
              <AnothDateCell key={date}>
                <AnothDateLabel data-testid="previous-month-dates">
                  {date}
                </AnothDateLabel>
              </AnothDateCell>
            ))}

            {dates.map((date) => {
              const dateData = ledgerList.find(
                (item) =>
                  item.ledger_schedule_date ===
                  dayjs(new Date(year, month, date)).format("YYYY-MM-DD")
              );

              const dayOfWeek = new Date(year, month, date).getDay();
              const isSaturdayDate = isSaturday(dayOfWeek);
              const isSundayDate = isSunday(dayOfWeek);

              const today = new Date();

              const isToday =
                year === today.getFullYear() &&
                month === today.getMonth() &&
                date === today.getDate();

              const addCommasToNumber = (number) => {
                return number.toLocaleString();
              };

              return (
                <DateCell key={date} onClick={() => handleOpenModal(date)}>
                  <DateLabel
                    $data-testid={isToday ? "date" : ""}
                    $isToday={isToday}
                    $isSaturday={isSaturdayDate}
                    $isSunday={isSundayDate}
                    $year={year}
                    $month={month}
                    $date={date}
                    $currentDate={currentDate}
                  >
                    {date}
                  </DateLabel>
                  {dateData && (
                    <>
                      <ContentWrapper>
                        <TotalIncomeLabel>
                          +
                          {addCommasToNumber(
                            calculateTotalIncomeAndExpense(date).totalIncome
                          )}
                          원
                        </TotalIncomeLabel>
                        <TotalExpenseLabel>
                          -
                          {addCommasToNumber(
                            calculateTotalIncomeAndExpense(date).totalExpense
                          )}
                          원
                        </TotalExpenseLabel>
                      </ContentWrapper>
                    </>
                  )}
                </DateCell>
              );
            })}
            {nextMonthDates.map((date) => (
              <AnothDateCell key={date}>
                <AnothDateLabel data-testid="next-month-date">
                  {date}
                </AnothDateLabel>
              </AnothDateCell>
            ))}
          </CalendarGrid>
        </CalendarWrapper>
      </StyledWrapper>
      {selectedDate && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <LegerDetailModal
            selectedDate={selectedDate}
            groupId={groupId}
            fetchData={fetchData}
          />
        </Modal>
      )}
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 120rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  margin-left: 3rem;
  justify-content: space-between;
`;

const Movement = styled.div`
  display: flex;
  gap: 1.2rem;
  color: var(--color-gray-07);
  align-items: center;
`;

const Button = styled.button`
  font-size: 2rem;
  background-color: transparent;
  color: var(--color-gray-07);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Month = styled.div`
  font-size: 2rem;
`;

const CalendarWrapper = styled.div`
  padding-right: 3rem;
  padding-left: 3rem;
 
`;

const ThisMonthButton = styled(Button)`
  margin-left: 0.8rem;
  margin-right: 5rem;
  font-size: 1.4rem;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-gray-05);
  border-bottom: 1px solid var(--color-gray-05);
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid var(--color-gray-03);
`;

const DayOfWeek = styled.div`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px var(--color-gray-03);
  background-color: var(--color-blue-01);
  color: ${(props) =>
    props.$day === "SUN"
      ? "var(--color-red-01)"
      : props.$day === "SAT"
      ? "var(--color-blue-03)"
      : "var(--color-gray-07)"};
  height: 20px;
`;

const AnothDateCell = styled.div`
  position: relative;
  height: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: var(--color-gray-03);
  border-left: 1px solid #c9c9c9;

  &:nth-child(7n + 1) {
    border-left: none; // 첫 번째 요소에 대한 스타일
  }
`;

const AnothDateLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.4rem;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-05);
`;

const DateCell = styled.div`
  position: relative;
  height: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: var(--color-white);
  border-left: 1px solid var(--color-gray-03);
  border-bottom: 1px solid var(--color-gray-03);
  cursor: pointer;

  &:nth-child(7n + 1) {
    border-left: none;
  }
`;

const DateLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.4rem;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props["data-testid"] === "today"
      ? "var(--color-gray-07)"
      : props.$isSaturday
      ? "var(--color-blue-03)"
      : props.$isSunday
      ? "var(--color-red-01)"
      : "var(--color-gray-07)"};

  background-color: ${(props) =>
    props["$data-testid"] === "date" &&
    props.$isToday &&
    css`
      ${props.$year === props.$currentDate.getFullYear() &&
      props.$month === props.$currentDate.getMonth() &&
      props.$month === props.$currentDate.getMonth()
        ? "var(--color-blue-01)"
        : "transparent"}
    `};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
`;

const TotalIncomeLabel = styled.div`
  padding-right: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-blue-03);
`;

const TotalExpenseLabel = styled.div`
  padding-right: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-red-01);
`;

export default LedgerCalendar;
