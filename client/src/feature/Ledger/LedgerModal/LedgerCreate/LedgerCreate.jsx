import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../../components/Modal/Modal";
/* 👇 구현 완료 후 삭제 예정 */
import Button from "../../../../components/Button/Button";

import styled from "styled-components";
import LedgerCategory from "./LedgerCategory";
import LedgerAmount from "./LedgerAmount";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import LedgerPayments from "./LedgerPayments";

import { readAllInOutcomes } from "../../../../api/inoutcomes.api";
import { createLedgerContent } from "../../../../api/ledgergroups.api";

const LedgerCreate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [inOutComesId, setInOutComesId] = useState();
  const [selectedPaymentId, setSelectedPaymentId] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [amountValue, setAmountValue] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { groupId } = useParams();
  const [pageType, setPageType] = useState("list");
  const [data, setData] = useState(false);
  const isIncomeSelected = inOutComesId === 1;

  useEffect(() => {
    // API에서 메뉴 아이템 가져오기
    const fetchMenuItems = async () => {
      try {
        const response = await readAllInOutcomes();
        const mappedMenuItems = response.map((response) => ({
          key: response.in_outcome_id,
          label: response.in_outcome_name,
        }));

        setMenuItems(mappedMenuItems);
      } catch (error) {
        console.error(error);
      }
    };
    setInOutComesId(1);
    fetchMenuItems();
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMemo = (e) => {
    setContent(e.target.value);
  };

  const handleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleValidate = () => {
    // 필수값 : inOutComesId, amoutValue, title, content
    if (
      inOutComesId === undefined ||
      amountValue === null ||
      title === "" ||
      content === ""
    ) {
      alert("필수 요소를 다 채우셨는지 확인 해주세요.");
    } else {
      addLedgerContents();
    }
  };

  const addLedgerContents = async () => {
    const groupId = 6
    const data = {
      member_id: 1,
      ledger_id: 1,
      ledger_group_id: groupId,
      ledger_title: title,
      ledger_content: content,
      ledger_amount: amountValue,
      category_id: selectedCategoryId,
      in_outcome_id: inOutComesId,
      payment_id: selectedPaymentId,
      ledger_schedule_date: "2023-07-19"
    }
    try {
      const response = await createLedgerContent(groupId, data);
      console.log(response.data);
      console.log("성공", response);
      handleModalVisible();
    } catch (error) {
      console.log("실패", error);
    }
  };

  const handleCategoryId = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handlePaymentId = (paymentId) => {
    setSelectedPaymentId(paymentId);
  };

  const handleAmountValue = (amountValue) => {
    setAmountValue(parseInt(amountValue));
  };

  return (
    <>
      <Button
        label="모달 열기"
        size="large"
        onClick={handleModalVisible}
        fontWeight={"bold"}
      />
      {/* 모달 시작 */}
      <Modal
        id="TodoModal" // 모달 id값
        open={isModalVisible} // 모달 열림 / 닫힘 state값
        closable // 우측 상단 모달 닫힘 버튼 유무 default값 : true
        onClose={handleModalVisible} // 모달 열고 닫는 state 변화 함수
      >
        <Container>
          <LedgerAddTitle>
            <p className="text">지출 및 소득 내역 추가하기</p>
          </LedgerAddTitle>
          <ModalBar>
            <LeftContent>
              <Dropdown
                menu={menuItems}
                defaultKey={{ key: 1, label: "수입" }}
                className="dropdown"
                onItemSelect={(itemId) => setInOutComesId(itemId)}
              />
              <DivLeftLine />
              <LedgerCategoryContainer>
                <LedgerInputWrapper>
                  <LedgerPayments onPaymentSelect={handlePaymentId}/>
                </LedgerInputWrapper>
              </LedgerCategoryContainer>
              <DivLeftLine />
              <LedgerCategoryContainer>
                <LedgerInputWrapper>
                  <LedgerCategory onCategorySelect={handleCategoryId} />
                </LedgerInputWrapper>
              </LedgerCategoryContainer>
              <DivRightLine />
            </LeftContent>
            <RightContent>
              <LedgerAmount onAmoutValue={handleAmountValue} />
            </RightContent>
          </ModalBar>
          <Title>
            <TitleInput placeholder="제목" onChange={handleTitle} />
          </Title>
          <TextArea>
            <textarea
              className="content-textarea"
              id="todo_content"
              onChange={handleMemo}
            />
          </TextArea>
          <ButtonWrapper>
            <Button
              label="취소"
              size="medium"
              fontcolor="var(--color-blue-03)"
              backgroundColor={"var(--color-white)"}
              style={{
                border: "1px solid var(--color-blue-03)",
                color: "var(--color-blue-03)",
              }}
              onClick={handleModalVisible}
            />
            <Button
              label="추가하기"
              size="medium"
              fontcolor="var(--color-white)"
              backgroundColor={"var(--color-blue-03)"}
              onClick={handleValidate}
            />
          </ButtonWrapper>
        </Container>
      </Modal>
    </>
  );
};

export default LedgerCreate;

// const Dropdown = styled.div`
//   font-size: 1.5rem;
// `;

const Container = styled.div`
  margin: 3rem 3rem;
  position: relative;
`;

const ModalBar = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-10);
  text-align: center;
`;

const LeftContent = styled.div`
  display: flex;
  gap: 1rem;
`;

const Title = styled.div`
  display: grid;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid var(--color-gray-10);
  text-align: center;
  height: 5rem;
`;

const TitleInput = styled.input`
  font-size: 2.2rem;
  height: 3rem;
  width: 100%;
  background-color: transparent;
`;

const RightContent = styled.div`
  text-align: right;
`;

const LedgerAddTitle = styled.div`
  border-bottom: 1px solid var(--color-gray-10);
  .text {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    margin-left: 2rem;
    color: var(--color-gray-11);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.2rem;
`;

const TextArea = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-gray-10);
  margin-bottom: 4.8rem;

  .content-textarea {
    width: calc(100% - 2.4rem);
    height: 28rem;
    resize: none;
    border: 1px solid var(--color-gray-10);
    border-radius: 1rem;
    display: block;
    padding: 1.2rem;
    color: var(--color-gray-11);
    font-family: unset;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const LedgerCategoryContainer = styled.div`
  display: flex;
  position: relative;
  width: 20rem;
  align-items: center;
`;

const LedgerInputWrapper = styled.div`
  position: absolute;
  z-index: 1;
`;

const DivLeftLine = styled.div`
  border-left: 1px solid var(--color-gray-10);
`;

const DivRightLine = styled.div`
  border-left: 1px solid var(--color-gray-10);
`;
