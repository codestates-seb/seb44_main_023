import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import LedgerCalendar from "../feature/Ledger/LedgerCalendar/LedgerCalendar";
import LedgerList from "../feature/Ledger/LedgerList/LedgerList";
import Layout from "../Layout/PagesLayout";

const LedgerPage = () => {
  const [pageType, setPageType] = useState("list");
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeParameter = (type) => () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", type);
    const newSearch = searchParams.toString();
    const newUrl = window.location.pathname + "?" + newSearch;
    navigate(newUrl);
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
        {pageType === "calendar" ? <LedgerCalendar /> : <LedgerList />}
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
`;

const Title = styled.div`
  font-size: 3.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
