import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import Layout from "../Layout/PagesLayout";
import LedgeSummary from '../feature/Main/LedgeSummary';
import TodoSummary from '../feature/Main/TodoSummary';
// import FloatingButton from '../components/Button/ButtonFloating';
import Loading from '../components/Loading/Loading';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  // try {
  //투두정보불러오기
  //   const groupInfo = await readTodoGroup(groupId);
  //   const members = await readTodoGroupMember(groupId);
  //   setGroupInfo(groupInfo);
  //   setMembers(members);
  //가계부정보불러오기

  //   setIsLoading(false);
  // } catch (err) {}
// };
  return (
    <>
    <Layout>
      
        {isLoading ? (
          <Loading />
        ) : (
        <MainWrapper>
          <TodoWrapper>
            <TodoContentWrapper>
              <TodoSummary/>
            </TodoContentWrapper>
          </TodoWrapper>
          <Line />
          <LedgerWrapper>
            <LedgerContentWrapper>
              <LedgeSummary/> 
            </LedgerContentWrapper>
          </LedgerWrapper>
        </MainWrapper>
        )}
     </Layout>
    </>
    
  );
};
export default Main;
const LedgerContentWrapper = styled.div`
  display: flex;
  width : 95%;
  height: 100%;
  border:5px solid red;
`
const TodoContentWrapper = styled.div`
  display: flex;
  width : 95%;
  height: 100%;
  border:5px solid red;
`
const LedgerWrapper = styled.div`
  width : 55%;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items: center; 
`
const TodoWrapper = styled.div`
  width : 45%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content:center;
  align-items: center;
  
`
const Line = styled.div`
    width: 2px;
    height: 90%;
    background-color: var(--color-gray-03);
`
const MainWrapper = styled.div`
  background-size: cover;
  background-position: center;
  width : 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  `
