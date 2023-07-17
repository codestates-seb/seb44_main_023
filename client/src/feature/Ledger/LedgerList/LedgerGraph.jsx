import { styled } from "styled-components";
import GraphBar from "./GraphBar";
import GraphPie from "./GraphPie";

const LedgerGraph = ({ ledgerList, selectedMonth }) => {
  return (
    <StyledWrapper>
      <GraphPie ledgerList={ledgerList} />
      <GraphBar ledgerList={ledgerList} selectedMonth={selectedMonth} />
    </StyledWrapper>
  );
};

export default LedgerGraph;

const StyledWrapper = styled.div`
  width: 50%;
  padding-top: 4.8rem;
`;
