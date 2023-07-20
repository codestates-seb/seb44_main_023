import React from "react";
import styled from "styled-components";

const ModalContentComponent = () => {
  const modalData = [
    {
      type: "소비",
      date: "23/07/20",
      account: "카드",
      category: "식비",
      note: "점심",
      amount: "20000",
    },
    {
      type: "수입",
      date: "24/07/20",
      account: "현금",
      category: "월급",
      note: "7월 월급",
      amount: "500000",
    },
  ];

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
      {modalData.length === 0 ? (
        <Empty>
          <div colSpan={6}>내역이 없습니다</div>
        </Empty>
      ) : (
        modalData.map((data, index) => (
          <ModalRow key={index}>
            <div>{data.type}</div>
            <div>{data.date}</div>
            <div>{data.account}</div>
            <div>{data.category}</div>
            <div>{data.note}</div>
            <div>{data.amount}원</div>
          </ModalRow>
        ))
      )}
    </>
  );
};

export default ModalContentComponent;

const ModalTitle = styled.div`
  /* padding: 20px; */
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 2fr 1fr;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-03);
  text-align: center;
  width: 1200px;
`;

const Empty = styled.div`
  text-align: center;
  font-size: 2rem;
  padding: 100px;
  color: var(--color-gray-04);
`;

const ModalRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 2fr 1fr;
  text-align: center;
  padding: 1rem;
  font-size: 1.8rem;
  border-bottom: 1px solid var(--color-gray-03);
`;
