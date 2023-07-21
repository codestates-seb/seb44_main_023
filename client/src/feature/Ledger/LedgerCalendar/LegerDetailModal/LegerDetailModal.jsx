import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import useQueryLedgerList from "../../../../query/ledgerList.query";

const LegerDetailModal = ({ selectedDate, groupId }) => {
  const { isLoading, data: ledgerList } = useQueryLedgerList({
    groupId,
    startDate: selectedDate,
    endDate: selectedDate,
  });

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  const addCommasToNumber = (number) => {
    return number.toLocaleString();
  };

  if (!ledgerList || ledgerList.length === 0) {
    return (
      <>
        <ModalTitle>
          <div>Type</div>
          <div>Date</div>
          <div>Account</div>
          <div>Category</div>
          <div>Note</div>
          <div>Amount</div>
        </ModalTitle>
        <Empty>내역이 없습니다.</Empty>
      </>
    );
  }

  return (
    <>
      <ModalTitle>
        <div>Type</div>
        <div>Date</div>
        <div>Account</div>
        <div>Category</div>
        <div>Note</div>
        <div>Amount</div>
      </ModalTitle>
      <ModalContentsWrapper>
        {ledgerList.map((data, index) => (
          <ModalContentsRow key={index}>
            <div>{data.inoutcome?.inoutcomeName}</div>
            <div>{dayjs(data.ledger_schedule_date).format("YY/MM/DD")}</div>
            <div>{data.payment?.paymentName}</div>
            <div>{data.category?.categoryName}</div>
            <div>{data.ledger_title}</div>
            <Amount
              className={
                data.inoutcome?.inoutcomeName === "지출" ? "expense" : "income"
              }
            >
              {addCommasToNumber(data.ledger_amount)}원
            </Amount>
          </ModalContentsRow>
        ))}
      </ModalContentsWrapper>
    </>
  );
};

export default LegerDetailModal;

const ModalTitle = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 2fr 1fr;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-03);
  text-align: center;
  width: 100rem;
`;

const ModalContentsWrapper = styled.div`
  max-height: 50rem;
  overflow-y: auto;
  padding-right: 1px;
  scrollbar-width: thin;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ModalContentsRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 2fr 1fr;
  text-align: center;
  padding: 1rem;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--color-gray-03);
  width: 100rem;
`;

const Amount = styled.div`
  &.expense {
    color: var(--color-red-01);
  }

  &.income {
    color: var(--color-blue-03);
  }
`;

const Empty = styled.div`
  font-size: 2rem;
  color: var(--color-gray-04);
  padding: 10rem;
  width: 100rem;
  text-align: center;
`;
