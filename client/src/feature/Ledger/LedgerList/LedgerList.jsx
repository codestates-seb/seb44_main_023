import { styled } from "styled-components";
import LedgerBook from "../../../components/LedgerBook/LedgerBook";
import LedgerGraph from "./LedgerGraph";

const LedgerList = ({
  groupId,
  ledgerList,
  setLedgerList,
  selectedMonth,
  handleSelectedMonth,
}) => {
  return (
    <StyledWrapper>
      <LedgerBook
        groupId={groupId}
        ledgerList={ledgerList}
        setLedgerList={setLedgerList}
        handleSelectedMonth={handleSelectedMonth}
        selectedMonth={selectedMonth}
      />
      <LedgerGraph ledgerList={ledgerList} selectedMonth={selectedMonth} />
    </StyledWrapper>
  );
};

export default LedgerList;

const StyledWrapper = styled.div`
  display: flex;
  gap: 4rem;
  padding: 0 6.4rem;
  height: 100%;
`;
