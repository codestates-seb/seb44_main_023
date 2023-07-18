import React, { useState } from "react";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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


  const dates = [];
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dates.push(i);
  }

  const data = [
    {
      date: 1,
      content: { expense: "10,000", income: "10,000" },
      type: "expense_income",
    },
    {
      date: 5,
      content: { expense: "10,000", income: "10,000" },
      type: "expense_income",
    },
    {
      date: 10,
      content: { expense: "10,000", income: "10,000" },
      type: "expense_income",
    },
    {
      date: 30,
      content: { expense: "10,000", income: "10,000" },
      type: "expense_income",
    },
  ];

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

  return (
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
            const dateData = data.find((item) => item.date === date);
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
                      <IncomeContent>+{dateData.content.income}</IncomeContent>
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
  );
};

const StyledWrapper = styled.div`
  /* background-color: #e6e6ff; */
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 64px;
  padding-bottom: 8px;
  justify-content: space-between;
`;

const Movement = styled.div`
display: flex;
`

const Button = styled.button`
  margin-top: 4px;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Month = styled.div`
  font-size: 2rem;
  margin: 0 1rem;
`;

const CalendarWrapper = styled.div`
  overflow-y: auto;
  padding-right: 40px;
  padding-left: 40px;
`;

const ThisMonthButton = styled(Button)`
  margin-left: 8px;
  margin-right: 44px;
  font-size: 1.4rem;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-gray-05);
  border-bottom: 1px solid var(--color-gray-05);
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayOfWeek = styled.div`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
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
  height: 9.9rem;
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: var(--color-gray-03);
  border-left: 1px solid #c9c9c9;
  border-bottom: 1px solid #dddddd;
`;

const AnothDateLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.4rem;
  width: 25px;
  height: 25px;
  color: var(--color-gray-05);
  background-color: ${(props) =>
    props["data-testid"] === "today" ? "#cfcffa" : "transparent"};
  text-align: center;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateCell = styled.div`
  position: relative;
  height: 9.9rem;
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: var(--color-white);
  border-left: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
`;

const DateLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.4rem;
  width: 25px;
  height: 25px;
  background-color: ${(props) =>
    props["data-testid"] === "today" ? "var(--color-blue-01)" : "transparent"};
  text-align: center;
  border-radius: 20px;
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
  padding-right: 8px;
  font-size: 1.4rem;
  color: var(--color-blue-03);
`;

const IncomeContent = styled.div`
  padding-right: 8px;
  font-size: 1.4rem;
  color: var(--color-red-01);
`;

export default LedgerCalendar;
