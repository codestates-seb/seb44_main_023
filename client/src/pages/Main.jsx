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
//    try {
// setIsLoading(false);
//      setIsLoading(false);
//   } catch (err) {}

  return (
    <>
    <Layout>
      <MainWrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
           <LedgeSummary/>
          <TodoSummary/>
          </>
        )}
      </MainWrapper>
     </Layout>
    </>
    
  );
};
export default Main;



const MainWrapper = styled.div`
  background-size: cover;
  background-position: center;
  height: 100vh;
  `
