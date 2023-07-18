import { styled } from "styled-components";
import GraphBar from "./GraphBar";
import GraphPie from "./GraphPie";

const LedgerGraph = ({ ledgerList, selectedMonth }) => {
  return (
    <StyledWrapper>
      {ledgerList.length === 0 ? (
        <div className="empty">아직 내역이 없습니다</div>
      ) : (
        <>
          <GraphPie ledgerList={ledgerList} />
          <GraphBar ledgerList={ledgerList} selectedMonth={selectedMonth} />
        </>
      )}
    </StyledWrapper>
  );
};

export default LedgerGraph;

const StyledWrapper = styled.div`
  width: 50%;
  padding-top: 4.8rem;

  .empty {
    font-size: 2.4rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
