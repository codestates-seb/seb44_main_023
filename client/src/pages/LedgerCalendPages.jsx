import React from "react";
import styled from "styled-components";
import ExpenseList from "./ExpenseList";
import ExpenseGraph from "./ExpenseGraph";

const BudgetPage = () => {
  return (
    <PageWrapper>
      <Section>
        <SectionTitle>지출내역 리스트</SectionTitle>
        <ExpenseList />
      </Section>
      <Section>
        <SectionTitle>지출내역 그래프</SectionTitle>
        <ExpenseGraph />
      </Section>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
`;

const Section = styled.div`
  flex: 1;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export default BudgetPage;
