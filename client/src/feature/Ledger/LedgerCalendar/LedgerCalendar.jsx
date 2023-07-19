import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { readLedgerList } from "../../../api/ledgergroups.api";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const LedgerCalendar = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();

  const [calendarData, setCalendarData] = useState([]);

  const dates = [];
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dates.push(i);
  }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    const updatedMonth = month - 1;
    const updatedYear = updatedMonth < 0 ? year - 1 : year;
    setMonth(updatedMonth < 0 ? 11 : updatedMonth);
    setYear(updatedYear);
  };

  const handleNextMonth = () => {
    const updatedMonth = month + 1;
    const updatedYear = updatedMonth > 11 ? year + 1 : year;
    setMonth(updatedMonth > 11 ? 0 : updatedMonth);
    setYear(updatedYear);
  };

  const handleThisMonth = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    setYear(currentYear);
    setMonth(currentMonth);
  };

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

  const fetchLedgerData = async () => {
    try {
      const groupId = 1; // 예시로 그룹 ID는 1로 설정
      const startDate = formatDate(new Date(year, month, 1));
      const endDate = formatDate(new Date(year, month + 1, 0));
      const response = await readLedgerList(groupId, startDate, endDate);
      setCalendarData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // year 또는 month가 변경되었을 때만 fetchLedgerData 함수 호출
    if (year !== currentYear || month !== currentMonth) {
      fetchLedgerData();
    }
  }, [year, month, currentYear, currentMonth]);

  return (
    <CenteredContainer>
      <StyledWrapper>
        <CalendarHeader>
          <Movement>
            <Button onClick={handlePrevMonth}>
              <AiOutlineLeft />
            </Button>
            <Month>{month + 1}월</Month>
            <Button onClick={handleNextMonth}>
              <AiOutlineRight />
            </Button>
          </Movement>
          <ThisMonthButton onClick={handleThisMonth}>이번 달</ThisMonthButton>
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
              const dateData = calendarData.find((item) => item.date === date);
              const isToday =
                year === currentYear &&
                month === currentMonth &&
                date === currentDay;

              const dayOfWeek = new Date(year, month, date).getDay();
              const isSaturdayDate = isSaturday(dayOfWeek);
              const isSundayDate = isSunday(dayOfWeek);

              return (
                <DateCell key={date}>
                  <DateLabel
                    data-testid={isToday ? "today" : "date"}
                    $isSaturday={isSaturdayDate}
                    $isSunday={isSundayDate}
                  >
                    {date}
                  </DateLabel>
                  {dateData && (
                    <>
                      <ContentWrapper>
                        <ExpenseContent>
                          -{dateData.content.expense}
                        </ExpenseContent>
                        <IncomeContent>
                          +{dateData.content.income}
                        </IncomeContent>
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
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 120rem
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  margin-left: 6.4rem;
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
  overflow-y: auto;
  padding-right: 6rem;
  padding-left: 6rem;
`;

const ThisMonthButton = styled(Button)`
  margin-left: 0.8rem;
  margin-right: 8rem;
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
  color: var(--color-gray-05);
  background-color: ${(props) =>
    props["data-testid"] === "today" ? "#cfcffa" : "transparent"};
  text-align: center;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

  &:nth-child(7n + 1) {
    border-left: none; // 첫 번째 요소에 대한 스타일
  }
`;

const DateLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.4rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${(props) =>
    props["data-testid"] === "today" ? "var(--color-blue-01)" : "transparent"};
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ExpenseContent = styled.div`
  padding-right: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-blue-03);
`;

const IncomeContent = styled.div`
  padding-right: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-red-01);
`;

export default LedgerCalendar;
