import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Modal/Modal";
/* 👇 구현 완료 후 삭제 예정 */
import Button from "../../../../components/Button/Button";

import styled from "styled-components";

// import { LedgerEdit } from "../LedgerEdit/LedgerEdit"

import { detailLedgerContent } from "../../../../api/ledgergroups.api";
import { deleteLedgerContent } from "../../../../api/ledgergroups.api";
import { useNavigate } from "react-router-dom";

const LedgerDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const handleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDetailOpen = async () => {
    const groupId = 6;
    const ledgerId = 20;
    try {
      const response = await detailLedgerContent(groupId, ledgerId);
      setData(response);
    } catch (error) {
      console.log("실패", error);
    }
  };

  useEffect(() => {
    handleDetailOpen();
  }, []);

  const handleDelete = async () => {
    const groupId = 6;
    const ledgerId = 7;
    try {
      await deleteLedgerContent(groupId, ledgerId);
      handleModalVisible();
      console.log("삭제 성공")
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <>
      <Button
        label="모달 디테일 열기"
        size="large"
        onClick={handleModalVisible}
        fontWeight={"bold"}
      />
      {/* 모달 시작 */}
      <Modal
        id="TodoModal"
        open={isModalVisible}
        closable
        onClose={handleModalVisible}
      >
        <Container>
          <Title>
            <TitleText>{data?.ledger_title}</TitleText>
          </Title>
          <ModalBar>
            <LeftContent>
              <InOutCome>{data?.inoutcome.inoutcomeName}</InOutCome>
              <DivLeftLine />
              <LedgerCategoryContainer>
                  <LedgerPayments>{data && data?.payment.paymentName || "지출 수단"}</LedgerPayments>
              </LedgerCategoryContainer>
              <DivLeftLine />
              <LedgerCategoryContainer>
                  <LedgerCategory>{data && data?.category.categoryName || "지출/수입 카테고리"}</LedgerCategory>
              </LedgerCategoryContainer>
              <DivRightLine />
            </LeftContent>
            <RightContent>
              <LedgerAmount>
                <span className="amount">{data?.ledger_amount}</span>
                <span className="won-sign">₩</span>
              </LedgerAmount>
            </RightContent>
          </ModalBar>
          <TextArea>
            <div className="content-textarea">{data?.ledger_content}</div>
          </TextArea>
          <ButtonWrapper>
            <Button
              label="삭제하기"
              size="medium"
              fontcolor="var(--color-blue-03)"
              backgroundColor="var(--color-white)"
              style={{
                border: "1px solid var(--color-red-01)",
                color: "var(--color-red-01)",
              }}
              onClick={handleDelete}
            />
            <Button
              label="수정하기"
              size="medium"
              fontcolor="var(--color-white)"
              backgroundColor={"var(--color-blue-03)"}
            />
          </ButtonWrapper>
        </Container>
      </Modal>
    </>
  );
};

export default LedgerDetail;

const Container = styled.div`
  margin: 3rem 3rem;
  position: relative;
`;

const ModalBar = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-10);
  text-align: center;
`;

const InOutCome = styled.div`
  width: 10rem;
  color: var(--color-gray-11);
`;
const LedgerPayments = styled.div`
  color: var(--color-gray-11);
`;

const LedgerCategory = styled.div`
  color: var(--color-gray-11);
`;

const LedgerAmount = styled.span`
  width: 10rem;
  justify-content: center;
  align-items: center;
  .amount {
    color: var(--color-gray-11);
  }
  .won-sign {
  margin-left: 0.5rem;
  color: var(--color-gray-11);
  }
`;

const LeftContent = styled.div`
  display: flex;
  gap: 1rem;
`;

const Title = styled.div`
  display: grid;
  align-items: left;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-10);
  height: 5rem;
`;

const TitleText = styled.div`
  font-size: 2.2rem;
  height: 3rem;
  width: 100%;
  background-color: transparent;
  color: var(--color-gray-11);
`;

const RightContent = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
`;

const TextArea = styled.div`
  padding: 0.8rem 0;
  margin-bottom: 4.8rem;
  border-bottom: 1px solid var(--color-gray-10);

  .content-textarea {
    height: 16rem;
    overflow-y: scroll;
    padding: 2.4rem 1rem;
    font-size: 2rem;
    word-break: break-all;
    color: var(--color-gray-11);
    height: 25rem;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const LedgerCategoryContainer = styled.div`
  width: 20rem;
`;


const DivLeftLine = styled.div`
  border-left: 1px solid var(--color-gray-10);
`;

const DivRightLine = styled.div`
  border-left: 1px solid var(--color-gray-10);
`;
