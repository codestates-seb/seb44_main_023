import dayjs from "dayjs";
import { styled } from "styled-components";

const LedgerBookItem = ({ bookInfo }) => {
  const {
    ledger_schedule_date,
    ledger_title,
    ledger_amount,
    inoutcome: { inoutcomeId },
  } = bookInfo;

  return (
    <StyledWrapper>
      <Date>{dayjs(ledger_schedule_date).get("date")}일</Date>
      <InOutcomeIcon
        className={`inout ${inoutcomeId === 1 ? "plus" : "minus"}`}
      >
        {inoutcomeId === 1 ? "+" : "-"}
      </InOutcomeIcon>
      <Detail className={`detail ${inoutcomeId === 1 ? "plus" : "minus"}`}>
        <div className="ledger-title">{ledger_title}</div>
        <div className="ledger-amount">{ledger_amount?.toLocaleString()}원</div>
      </Detail>
    </StyledWrapper>
  );
};

export default LedgerBookItem;

const StyledWrapper = styled.div`
  background-color: var(--color-gray-02);
  padding: 1.6rem 2.4rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-03);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    border-top: 1px solid var(--color-gray-03);
  }
`;

const Date = styled.div`
  width: 4.4rem;
  margin-right: 4rem;
`;

const InOutcomeIcon = styled.div`
  margin-right: 4rem;

  &.plus {
    color: var(--color-blue-03);
  }

  &.minus {
    color: var(--color-red-01);
  }
`;

const Detail = styled.div`
  width: 100%;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.8rem;

  &.plus {
    color: var(--color-blue-03);
  }

  &.minus {
    color: var(--color-red-01);
  }
`;
