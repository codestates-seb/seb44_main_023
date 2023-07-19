import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  readLedgerGroup,
  readLedgerGroupMember,
  readLedgerList,
} from "../api/ledgergroups.api";
import Loading from "../components/Loading/Loading";
import LedgerCalendar from "../feature/Ledger/LedgerCalendar/LedgerCalendar";
import LedgerGroup from "../feature/Ledger/LedgerGroup";
import LedgerList from "../feature/Ledger/LedgerList/LedgerList";
import Layout from "../Layout/PagesLayout";

const LedgerPage = () => {
  const [pageType, setPageType] = useState("list");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().locale("ko"));
  const [groupInfo, setGroupInfo] = useState();
  const [members, setMembers] = useState();
  const [ledgerList, setLedgerList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { groupId } = useParams();

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

  const requestLedgerInfo = async () => {
    try {
      const groupInfo = await readLedgerGroup(groupId);
      const members = await readLedgerGroupMember(groupId);
      setGroupInfo(groupInfo);
      setMembers(members);
    } catch (err) {}
  };

  const requestLedgerList = async () => {
    try {
      const ledgerList = await readLedgerList(
        groupId,
        selectedMonth.clone().startOf("month").format("YYYY-MM-DD"),
        selectedMonth.clone().endOf("month").format("YYYY-MM-DD")
      );
      setLedgerList(ledgerList);
      setIsLoading(false);
    } catch (err) {}
  };

  let unselectedColor = {
    border: "1px solid var(--color-blue-03)",
    color: "var(--color-blue-03)",
    backgroundColor: "var(--color-white)",
    fontSize: "1.6rem",
  };

  let selectedColor = {
    backgroundColor: "var(--color-blue-03)",
    fontSize: "1.6rem",
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentParams = searchParams.get("type");
    setPageType(currentParams);
  }, [location]);

  useEffect(() => {
    requestLedgerInfo();
    requestLedgerList();
  }, [selectedMonth]);

  return (
    <Layout>
      <StyledWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <LedgerGroup
              groupInfo={groupInfo}
              members={members}
              pageType={pageType}
              handleChangeParameter={handleChangeParameter}
            />
            {pageType === "calendar" ? (
              <LedgerCalendar
                selectedMonth={selectedMonth}
                handleSelectedMonth={handleSelectedMonth}
              />
            ) : (
              <LedgerList
                ledgerList={ledgerList}
                selectedMonth={selectedMonth}
                handleSelectedMonth={handleSelectedMonth}
              />
            )}
          </>
        )}
      </StyledWrapper>
    </Layout>
  );
};

export default LedgerPage;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
