import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import LedgerCalendar from "../feature/Ledger/LedgerCalendar/LedgerCalendar";
import LedgerList from "../feature/Ledger/LedgerList/LedgerList";
import Layout from "../Layout/PagesLayout";

const LedgerPage = () => {
  const [pageType, setPageType] = useState("list");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));

  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeParameter = (type) => () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", type);
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + "?" + newSearch;
    navigate(newUrl);
  };

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

  let unselectedColor = {
    border: "1px solid var(--color-blue-03)",
    color: "var(--color-blue-03)",
    backgroundColor: "var(--color-white)",
  };

  let selectedColor = {
    backgroundColor: "var(--color-blue-03)",
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentParams = searchParams.get("type");
    setPageType(currentParams);
  }, [location]);

  return (
    <Layout>
      <StyledWrapper>
        <GroupTitle>
          <Title>Group 1</Title>
          <ButtonWrapper>
            <Button
              size="medium"
              style={pageType === "calendar" ? selectedColor : unselectedColor}
              label="달력형"
              onClick={handleChangeParameter("calendar")}
            />
            <Button
              size="medium"
              label="리스트형"
              style={pageType === "list" ? selectedColor : unselectedColor}
              onClick={handleChangeParameter("list")}
            />
          </ButtonWrapper>
        </GroupTitle>
        {pageType === "calendar" ? (
          <LedgerCalendar
            selectedMonth={selectedMonth}
            handleSelectedMonth={handleSelectedMonth}
          />
        ) : (
          <LedgerList
            selectedMonth={selectedMonth}
            handleSelectedMonth={handleSelectedMonth}
          />
        )}
      </StyledWrapper>
    </Layout>
  );
};

export default LedgerPage;

const StyledWrapper = styled.div`
  padding: 6.4rem;
`;

const GroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

const Title = styled.div`
  font-size: 3.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
