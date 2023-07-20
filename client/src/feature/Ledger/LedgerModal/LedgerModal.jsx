import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
/* 👇 구현 완료 후 삭제 예정 */
import Button from "../../../components/Button/Button";

import styled from "styled-components";
import LedgerCategory from "./LedgerCategory";
import LedgerAmount from "./LedgerAmount";
// import Dropdown from "../../../components/Dropdown/Dropdown";

const LedgerModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalVisible = () => setIsModalVisible(!isModalVisible);

  return (
    <div>
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
              <Dropdown>드롭다운 자리</Dropdown>
              <Dropdown>드롭다운 자리</Dropdown>
              <Defence>
                <LedgerCategoryWrapper>
                  <LedgerCategory />
                </LedgerCategoryWrapper>
              </Defence>
            </LeftContent>
            <RightContent>
              <LedgerAmount />
            </RightContent>
          </ModalBar>
          <TextArea>
            <textarea className="content-textarea" id="todo_content" />
          </TextArea>
          <ButtonWrapper>
            <Button
              label="취소"
              size="medium"
              fontcolor="var(--color-blue-03)"
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-blue-03)",
                color: "var(--color-blue-03)",
              }}
              onClick={handleModalVisible}
            />
            <Button
              label="추가하기"
              size="medium"
              fontcolor="var(--color-white)"
              style={{
                backgroundColor: "var(--color-blue-03)",
              }}
              onClick={console.log("추가")}
            />
          </ButtonWrapper>
        </Container>
      </Modal>
    </div>
  );
};

export default LedgerModal;

const Dropdown = styled.div`
  font-size: 1.5rem;
`;

const Container = styled.div`
  margin: 3rem 3rem;
  position: relative;
`;

const ModalBar = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr; /* 왼쪽 부분 3칸, 오른쪽 부분 1칸으로 설정 */
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

const Defence = styled.div`
  width: 100%;
`;

const LedgerCategoryWrapper = styled.div`
  margin: 0.6rem 0rem 0rem 5rem;
  position: absolute;
  z-index: 1;
`;

