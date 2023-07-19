import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; 
import Loading from '../../components/Loading/Loading';
import { useGetIsTodoNull } from '../../store/store.contentIsNull';
import TodoGroup from '../Todo/TodoGroup';

const TodoSummary=()=>{
    const todoGroupName="Group 1";
    const content = "투두있음 "
    const isTodoNull = useGetIsTodoNull();
    console.log("TodoSummary isLegderNull:",isTodoNull)

    //투두의 경우 빈경우를 어떻게 처리할지 고민중
    //전체가 빈것이아니라 한날짜나 일부만 빈날짜이기때문 
    return (
        <>
          <TodoWrapper>
            <TodoTitle>{todoGroupName}</TodoTitle>
              <TodoContentWrapper>
              {isTodoNull ? (
              <>
              <ContentEmptyText>
              일정 없음
              </ContentEmptyText>
              </>
                ) : (
              <ContentText>
                {content}
              </ContentText>                
               )}
              </TodoContentWrapper>
            </TodoWrapper>
        </>
        
      );
    };
    
    export default TodoSummary;
        

const ContentEmptyText = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0%;
  color: var(--color-gray-07);
`

const ContentText = styled.div`
  display: flex;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0%;
  color: var(--color-gray-07);
`

const TodoContentWrapper = styled.div`
  display: flex;
  flex-direction : column;
  overflow-y: auto;
`

const TodoTitle = styled.div`
  margin-top:3.2rem;
  margin-bottom:1.6rem;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 4.4rem;
  letter-spacing: 0%;
  color: var(--color-gray-08);
`

const TodoWrapper = styled.div`
  width : 100%;
  display: flex;
  flex-direction : column;
`