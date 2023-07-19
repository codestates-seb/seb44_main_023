import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../Layout/PagesLayout";
import FloatingButton from "../components/Button/ButtonFloating";
import MainTodo from "../feature/Main/MainTodo";
import MainLedger from "../feature/Main/MainLedger";
import Loading from "../components/Loading/Loading";

const MainPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState({ todo: null, ledger: null });

  const requestGroup = () => {
    let defaultGroup = localStorage.getItem("planfinity-group");
    if (defaultGroup) {
      defaultGroup = JSON.parse(defaultGroup);
      setGroup({
        todo: defaultGroup.todoGroup.key,
        ledger: defaultGroup.ledgerGroup.key,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    requestGroup();
  }, []);

  return (
    <Layout>
      <StyledWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MainTodo groupId={group.todo} />
            <MainLedger groupId={group.ledger} />
            <ButtonWrapper>
              <FloatingButton icon="hide" />
            </ButtonWrapper>
          </>
        )}
      </StyledWrapper>
    </Layout>
  );
};
export default MainPage;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
`;
