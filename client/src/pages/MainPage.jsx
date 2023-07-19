import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; 
import Layout from "../Layout/PagesLayout";
import LedgeSummary from '../feature/Main/LedgeSummary';
import TodoSummary from '../feature/Main/TodoSummary';
import FloatingButton from '../components/Button/ButtonFloating';
import Loading from '../components/Loading/Loading';
import { useGetWeatherInfo } from '../store/store.weather';
import WeatherImage from '../feature/Home/WeatherImage';
import { useContentIsNullStore } from '../store/store.contentIsNull';


const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] =useState(false)
  const weather = useGetWeatherInfo();
  const weatherType = weather.type;
 const {setIsTodoNull,setIsLedgerNull } = useContentIsNullStore();
  //
  // 

  const handleHideClick = () => {
   console.log("hide",isHide); 
   setIsHide(!isHide);
  };

  // try {
     //투두정보불러오기
    
    //   const groupInfo = await readTodoGroup(groupId);
    //   const members = await readTodoGroupMember(groupId);
    //   setGroupInfo(groupInfo);
    //   setMembers(members);
    //가계부정보불러오기 
    //...
    //  받아와서 안비어있으면~, 
    //그런데 투두는 일자별 관리일거같아서 구조를 변경해야할것같다/
    // setIsTodoNull(false); <-
    // 받아와서 안비어있으면~
    // setIsLedgerNull(false); 
    // setIsLoading(false);
    // } catch (err) {}
  // };


  return (
    <>
 {isHide ? (
    <>
      <WeatherImage weatherType={weatherType}/>
      <FloatingButtonContainer>
        {/* 임시로 보이기라는 버튼을 만들어서
        다시 메인페이지로 돌아가게 작성, 아직 안정한것으로암 */}
        <button onClick={handleHideClick} >보이기</button>
        </FloatingButtonContainer>
    </>
      ) : (
  
      isLoading ? (
        <Loading />
      ) : (
       <Layout>
        <MainWrapper>
          <TodoWrapper>
            <TodoContentWrapper>
              <TodoSummary />
            </TodoContentWrapper>
          </TodoWrapper>
          <Line />
          <LedgerWrapper>
            <LedgerContentWrapper>
              <LedgeSummary/> 
            </LedgerContentWrapper>
          </LedgerWrapper>
          <FloatingButtonContainer>
            <FloatingButton icon="hide" onClick={handleHideClick} />
          </FloatingButtonContainer>
        </MainWrapper>
      </Layout>

      )
  )};
   </>
  );
};
export default Main;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const LedgerContentWrapper = styled.div`
  display: flex;
  width : 95%;
  height: 100%;
`
const TodoContentWrapper = styled.div`
  display: flex;
  width : 95%;
  height: 100%;
`
const LedgerWrapper = styled.div`
  width : 55%;
  height: 100%;
  display: flex;
  justify-content:center;
`
const TodoWrapper = styled.div`
  width : 45%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content:center;
`
const Line = styled.div`
 width: 2px;
 height: 90%;
 background-color: var(--color-gray-03);
`
const MainWrapper = styled.div`
  width : 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`
