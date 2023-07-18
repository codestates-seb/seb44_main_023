import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; 
import Loading from '../../components/Loading/Loading';
import { useGetIsTodoNull } from '../../store/store.contentIsNull';
import TodoGroup from '../Todo/TodoGroup';

const TodoSummary=()=>{
    const todoGroupName="Group 1";
    const isTodoNull = useGetIsTodoNull();
    console.log("TodoSummary isLegderNull:",isTodoNull)

    return (
        <>
            {isTodoNull ? (
              <div>???</div>
            ) : (
            <TodoWrapper>
              <TodoTitle>{todoGroupName}</TodoTitle>
                <TodoContentWrapper>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>

                </TodoContentWrapper>
            </TodoWrapper>
            )}
        </>
        
      );
    };
    
    export default TodoSummary;
        
const NullComponent =(date)=>{
  return(
    <>
  <TodoTitle>{date}</TodoTitle>
                <TodoContentWrapper>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>
                <NullComponent> 투두다</NullComponent>

                </TodoContentWrapper>


    </>
  );
}
const Content = styled.div`
display: flex;
height: 16rem;
border:5px solid red;
`
const TodoContentWrapper = styled.div`
display: flex;
flex-direction : column;
border:5px solid red;
overflow-y: auto;
`

const TodoTitle = styled.div`
border:5px solid red;

margin-top:3.2rem;
margin-bottom:1.6rem;

font-size: 3.2rem;
font-weight: bold;
line-height: 4.4rem;
letter-spacing: 0%;
color: var(--color-gray-08);
`

const Line = styled.div`
    width: 2px;
    height: 90%;
    background-color: var(--color-gray-03);
    `
const TodoWrapper = styled.div`
  width : 100%;
  display: flex;
  flex-direction : column;
`