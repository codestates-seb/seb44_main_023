import { styled } from "styled-components";
import GraphBar from "./GraphBar";
import GraphPie from "./GraphPie";

const LedgerGraph = ({ ledgerList, selectedMonth }) => {
  return (
    <StyledWrapper>
      {ledgerList.length === 0 ? (
        <div className="empty">아직 내역이 없습니다</div>
      ) : (
        <div className="graph-wrapper">
          <GraphPie ledgerList={ledgerList} />
          <GraphBar ledgerList={ledgerList} selectedMonth={selectedMonth} />
        </div>
      )}
    </StyledWrapper>
  );
};

export default LedgerGraph;

const StyledWrapper = styled.div`
  width: 50%;
  padding: 4.8rem 0;
  overflow-y: scroll;
  padding-right: 1.2rem;

  .empty {
    font-size: 2.4rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .graph-wrapper {
    height: 100%;
  }
`;
