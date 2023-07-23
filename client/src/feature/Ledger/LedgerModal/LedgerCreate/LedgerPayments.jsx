import React, { useState, useEffect, useRef } from "react";
import {
  readAllPayments,
  addPayments,
  editPayments,
  deletePayments,
} from "../../../../api/payments.api";
import styled from "styled-components";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";

const LedgerPayments = ({onPaymentSelect}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPayments, setAllPayments] = useState([]);
  const [editingPaymentsId, setEditingPaymentsId] = useState(null);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isPaymentsSelect, setIsPaymentsSelect] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    // 모든 카테고리 데이터 가져오기
    const fetchAllPayments = async () => {
      try {
        const Payments = await readAllPayments();
        setAllPayments(Payments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPayments();
  }, []);

  // 카테고리 추가 함수
  const handleAddPayments = async () => {
    try {
      const newPayments = await addPayments(1, searchQuery);
      setAllPayments([...allPayments, newPayments]);
      setSearchQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  // 카테고리 수정 함수
  const handleEditPayments = async (paymentsId, updatedPaymentsName) => {
    try {
      await editPayments(1, paymentsId, updatedPaymentsName);
      setAllPayments(
        allPayments.map((payments) =>
          payments.payment_id === paymentsId
            ? {
                ...payments,
                payment_name: updatedPaymentsName,
                editing: false,
              }
            : payments
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 카테고리 삭제 함수
  const handleDeletePayments = async (paymentsId) => {
    try {
      await deletePayments(paymentsId);
      setAllPayments(
        allPayments.filter((payments) => payments.payment_id !== paymentsId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 검색 결과 카테고리 필터링
  const filteredPayments = allPayments.filter((payments) =>
    payments.payment_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 검색어 입력 이벤트 처리
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색어 입력 후 엔터 키 처리
  const handleSearchQueryEnter = (e) => {
    if (e.key === "Enter") {
      handleAddPayments();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsPaymentsSelect(false);
    onPaymentSelect(undefined);
  };

  return (
    <PaymentsContainer>
      {/* 카테고리 검색 창 */}
      {isPaymentsSelect && (
        <SelectBtnWrapper>
          <SelectBtn type="text" value={searchQuery}>
            <SelectBtnText>{searchQuery}</SelectBtnText>
            <CloseIcon onClick={() => handleClearSearch()} />
          </SelectBtn>
        </SelectBtnWrapper>
      )}
      {!isPaymentsSelect && (
        <>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
            onKeyPress={handleSearchQueryEnter}
            placeholder="지출 수단"
          />
        </>
      )}
      {/* 검색 결과 카테고리 목록 */}
      {isPaymentsOpen && (
        <PaymentsListContainer>
          <PaymentsList ref={listRef}>
            {filteredPayments.map((payments) => (
              <PaymentsItem key={payments.payment_id}>
                {editingPaymentsId === payments.payment_id ? (
                  <PaymentsEditInput
                    value={payments.payment_name}
                    onChange={(e) =>
                      setAllPayments(
                        allPayments.map((c) =>
                          c.payment_id === payments.payment_id
                            ? { ...c, payment_name: e.target.value }
                            : c
                        )
                      )
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEditPayments(
                          payments.payment_id,
                          payments.payment_name
                        );
                        setEditingPaymentsId(null);
                      }
                    }}
                    onBlur={() => {
                      handleEditPayments(
                        payments.payment_id,
                        payments.payment_name
                      );
                      setEditingPaymentsId(null);
                    }}
                  />
                ) : (
                  <>
                    <PaymentsEditSpan
                      onClick={() => {
                        setSearchQuery(payments.payment_name);
                        setIsPaymentsOpen(false);
                        setIsPaymentsSelect(true);
                        onPaymentSelect(payments.payment_id)
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {payments.payment_name}
                    </PaymentsEditSpan>
                    <PaymentsEditButton
                      onClick={() => setEditingPaymentsId(payments.payment_id)}
                    >
                      <MdEdit />
                    </PaymentsEditButton>
                    <PaymentsDeleteButton
                      onClick={() => handleDeletePayments(payments.payment_id)}
                    >
                      <MdDelete />
                    </PaymentsDeleteButton>
                  </>
                )}
              </PaymentsItem>
            ))}
          </PaymentsList>
        </PaymentsListContainer>
      )}
    </PaymentsContainer>
  );
};

export default LedgerPayments;

const PaymentsContainer = styled.div`
  background-color: transparent;
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  width: 20rem;
  background-color: transparent;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const PaymentsListContainer = styled.div`
  border-radius: 1rem;
`;

const PaymentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  border-radius: 1rem;
  width: 13rem;
  position: absolute;
  top: calc(100%);
  width: 100%;
  background-color: var(--color-gray-02);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--color-gray-10);
  max-height: 16rem;
  overflow-y: auto;
`;

const PaymentsItem = styled.div`
  display: flex;
  flex: 1;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--color-gray-10);
  span {
    text-align: left;
    margin-top: 0.5rem;
    margin-left: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--color-gray-9);
  }
  &:hover {
    background-color: var(--color-blue-01);
  }
`;

const PaymentsEditSpan = styled.span`
  flex: 1;
  width: 100%;
`;

const PaymentsEditInput = styled.input`
  flex: 1;
  width: 100%;
  background-color: var(--color-blue-01);
  border-radius: 0.5rem;
  text-align: left;
  margin: 0rem 1.2rem;
`;

const PaymentsEditButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0rem 0rem 0rem;
  cursor: pointer;
  font-size: 1rem;
`;

const PaymentsDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0.5rem 0.5rem 0rem 0.3rem;
  cursor: pointer;
  font-size: 1rem;
`;

const SelectBtnWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;

const SelectBtn = styled.button`
  border-radius: 2rem;
  background-color: var(--color-blue-01);
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(MdClose)`
  cursor: pointer;
  margin-left: 0.6rem;
  margin-right: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-gray-10);
`;

const SelectBtnText = styled.span`
  margin-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: var(--color-gray-9);
`;
