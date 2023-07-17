import { styled } from "styled-components";
import Button from "../Button/Button";
import LedgerBookItem from "./LedgerBookItem";
import LedgerBookSummary from "./LedgerBookSummary";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const LedgerBook = ({ ledgerList, selectedMonth, handleSelectedMonth }) => {
  const [isShowAll, setIsShowAll] = useState(false);

  return (
    <StyledWrapper>
      <LedgerBookSummary
        ledgerList={ledgerList}
        selectedMonth={selectedMonth}
        handleSelectedMonth={handleSelectedMonth}
      />
      <ButtonWrapper>
        <AddButton
          label={
            <ButtonLabel>
              내역 추가
              <AiOutlinePlus />
            </ButtonLabel>
          }
          size="medium"
          style={{
            backgroundColor: "var(--color-blue-03)",
            fontSize: "1.6rem",
          }}
        />
        <AddButton
          label={
            <ButtonLabel>
              여러내역 추가
              <AiOutlinePlus />
            </ButtonLabel>
          }
          size="medium"
          style={{
            backgroundColor: "var(--color-blue-03)",
            fontSize: "1.6rem",
          }}
        />
      </ButtonWrapper>
      <LedgerBookList>
        {isShowAll
          ? ledgerList.map((bookInfo, index) => (
              <LedgerBookItem
                key={`ledger-book-item-${index}`}
                bookInfo={bookInfo}
              />
            ))
          : ledgerList
              .slice(0, 3)
              .map((bookInfo, index) => (
                <LedgerBookItem
                  key={`ledger-book-item-${index}`}
                  bookInfo={bookInfo}
                />
              ))}
        {!isShowAll && (
          <MoreButton>
            <span onClick={() => setIsShowAll(true)}>show all views</span>
          </MoreButton>
        )}
      </LedgerBookList>
    </StyledWrapper>
  );
};

export default LedgerBook;

const StyledWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const AddButton = styled(Button)`
  width: max-content;
  padding: 0 1.2rem;
`;

const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const LedgerBookList = styled.div`
  padding-right: 1.6rem;
  overflow-y: scroll;
  margin-bottom: 4.8rem;

  .more-button {
    margin: 0 auto;
  }
`;

const MoreButton = styled.div`
  padding-top: 2.4rem;
  text-align: center;

  span {
    margin: 0 auto;
    cursor: pointer;
    font-size: 2rem;
  }
`;
