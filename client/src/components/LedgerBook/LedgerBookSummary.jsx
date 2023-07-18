import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const LedgerBookSummary = ({
  ledgerList,
  selectedMonth,
  handleSelectedMonth,
}) => {
  const balance = ledgerList.reduce((acc, curr) => {
    if (curr.in_outcome.in_outcome_name === "지출") {
      acc -= curr.amount;
    } else {
      acc += curr.amount;
    }
    return acc;
  }, 0);

  const totalExpense = ledgerList.reduce((acc, curr) => {
    if (curr.in_outcome.in_outcome_name === "지출") {
      acc += curr.amount;
    }
    return acc;
  }, 0);

  const totalIncome = ledgerList.reduce((acc, curr) => {
    if (curr.in_outcome.in_outcome_name === "수입") {
      acc += curr.amount;
    }
    return acc;
  }, 0);

  return (
    <StyledWrapper>
      <MonthSetting>
        <MonthNavigation>
          <div className="navigation-button">
            <AiOutlineLeft onClick={handleSelectedMonth("PREV")} />
          </div>
          <div className="current-month">{selectedMonth.format("M")}월</div>
          <div className="navigation-button">
            <AiOutlineRight onClick={handleSelectedMonth("NEXT")} />
          </div>
        </MonthNavigation>
        <div
          className="this-month-button"
          onClick={handleSelectedMonth("TODAY")}
        >
          이번 달
        </div>
      </MonthSetting>
      <Summary>
        {ledgerList?.length === 0 ? (
          <div className="empty">이번 달 금액을 추가해주세요</div>
        ) : (
          <>
            <div className="balance">잔액 {balance.toLocaleString()}원</div>
            <div className="balance-detail">
              <div className="income">소득 {totalIncome.toLocaleString()}</div>
              <div className="expense">
                지출 {totalExpense.toLocaleString()}
              </div>
            </div>
          </>
        )}
      </Summary>
    </StyledWrapper>
  );
};

export default LedgerBookSummary;

const StyledWrapper = styled.div``;

const MonthSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-gray-07);
  margin-bottom: 1.6rem;

  .this-month-button {
    font-size: 1.6rem;
    border-bottom: 1px solid var(--color-gray-07);
    cursor: pointer;
  }
`;

const MonthNavigation = styled.div`
  font-size: 2rem;
  gap: 1.2rem;
  display: flex;
  align-items: center;

  .navigation-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .current-month {
    cursor: pointer;
  }
`;

const Summary = styled.div`
  padding: 3.2rem 3.6rem;
  background-color: var(--color-gray-02);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: var(--color-gray-07);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .empty {
    text-align: center;
    width: 100%;
    font-size: 2.4rem;
  }

  .balance {
    font-size: 3.2rem;
    text-align: center;
  }

  .balance-detail {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;

    .income {
      color: var(--color-blue-03);
    }

    .expense {
      color: var(--color-red-01);
    }
  }
`;
