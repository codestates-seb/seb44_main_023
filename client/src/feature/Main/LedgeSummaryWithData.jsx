import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; 
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { IoChevronBack,IoChevronForward } from "react-icons/io5";
import { useGetIsLedgerNull } from '../../store/store.contentIsNull';
import LedgeSummaryEmpty from './LedgeSummaryEmpty';
const LedgeSummaryWithData=()=>{
    const navigate = useNavigate(); 
    const isLegderNull = useGetIsLedgerNull();
    const btnColor ="var(--color-blue-03)";
    const ledgerGroupName="Group 1";
   
    console.log("LedgeSummary isLegderNull:",isLegderNull)
    const IntIncome=3400000;
    const income=IntIncome.toLocaleString();
    const IntOutcome=3399596;
    const outcome=IntOutcome.toLocaleString();;
    const IntLeftAmount=IntIncome-IntOutcome;
    const LeftAmount=IntLeftAmount.toLocaleString();;

    const handleLedgerAdd = () => {
      navigate("/"); 
    };
    const handleLedgerListAdd = () => {
      navigate("/"); 
    };
    const handleClickShowAll = () => {
        navigate("/"); 
      };

  return (
    <>
        {isLegderNull ? (
          <LedgeSummaryEmpty />
        ) : (
         <LedgerWrapper>
          <LedgerTitle>{ledgerGroupName}</LedgerTitle>
          <div style={{display:"flex",flexDirection:"ro"}}>
          <MonthlyMove> <IoChevronBack /> </MonthlyMove>  
          <MonthlyMove> 6월 </MonthlyMove>
          <MonthlyMove> <IoChevronForward/> </MonthlyMove>
          </div>
          
          <LedgerSummayWapper> 
            <SummayDiv>
                <LeftDiv>잔액 {LeftAmount}원</LeftDiv>
                <InOutWapper>
                    <IncomeDiv>소득 {income}</IncomeDiv>
                    <OutcomeDiv>지출 {outcome}</OutcomeDiv>
                </InOutWapper>
            </SummayDiv>
          </LedgerSummayWapper>
          <LedgerAddBtn> 
                    <Button
                    label="내역추가 +"
                    size="small" 
                    onClick={handleLedgerAdd} 
                    bordercolor={btnColor}
                    backgroundColor={btnColor}
                    fontcolor="var(--color-white)"
                    />
            
                    <Button
                    label="여러내역추가 +"
                    size="small"
                    onClick={handleLedgerListAdd}
                    bordercolor={btnColor}
                    backgroundColor={btnColor}
                    fontcolor="var(--color-white)"
                    style={{marginLeft:"2.4rem"}}
                    /> 
            </LedgerAddBtn>
          <LedgerListWapper>
            <LedgerListDiv>30일 - 동네술집 51,000</LedgerListDiv>
            <LedgerListDiv></LedgerListDiv>
            <LedgerListDiv></LedgerListDiv>
          </LedgerListWapper>
          <ShowAll onClick={handleClickShowAll}>show all veiws</ShowAll>
        </LedgerWrapper>
        )}
    </>
    
  );
};
    export default LedgeSummaryWithData;

const ShowAll = styled.div`
margin-top: 4.8rem;
display: flex;
font-size: 2.0rem;
 font-weight: bold;
 line-height: 2.4rem;
 letter-spacing: 0%;
color: var(--color-gray-07);
justify-content: center;  
align-items: center;

cursor: pointer;
  &:hover {
    color: var(--color-blue-03);
  }
` 
const LedgerListDiv = styled.div`

height:6.4rem;
border-bottom: 0.1rem solid var(--color-gray-03);

display: flex;
align-items: center;
`

const LedgerListWapper = styled.div`
display: flex;
flex-direction: column;
border-top: 0.1rem solid var(--color-gray-03);
background-color: var(--color-white);
`
    
    
const LedgerAddBtn = styled.div`
display: flex;
flex-direction: row;
height: 10rem;
align-items: center;

`


const OutcomeDiv = styled.div`
   display: flex;
   font-size: 2.0rem;
   line-height: 2.4rem;
   letter-spacing: 0%;
   color: var(--color-red-01);
`
const IncomeDiv = styled.div`
   display: flex;
   font-size: 2.0rem;
   line-height: 2.4rem;
   letter-spacing: 0%;
   color: var(--color-blue-03);
`

const InOutWapper = styled.div`
display: flex;
justify-content : space-evenly;
height: 60%;
flex-direction: column;


//background-color: var(--color-gray-02);
background-color: #fbfbfa;
`
const LeftDiv = styled.div`
   display: flex;

   font-size: 2.4rem;
   font-weight: bold;
   line-height: 2.8rem;
   letter-spacing: 0%;
   color: var(--color-gray-07);

`

const LedgerSummayWapper = styled.div`
    display: flex;  
    flex-direction: row;
    justify-content:center;
    width : 100%;
    height: 15.6rem;
    //background-color: var(--color-gray-02);
    background-color: #fbfbfa;
`

const SummayDiv = styled.div`
    display: flex;  
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    width : 90%;
`

// const MonthlyMove = styled.div`
// display: flex;
// flex-direction: row;

// height: 6rem;

// `

const MonthlyMove = styled.a`
   display: flex;
   align-items: center;
   justify-content:center;
   
   height:6.4rem;
   min-width:3.2rem;
   
   font-size: 3.2rem;
   font-weight: bold;
   line-height: 3.8rem;
   letter-spacing: 0%;
   color: var(--color-black);

   cursor: pointer;
  &:hover {
    color: var(--color-blue-03);
  }
` 

const LedgerTitle = styled.div`
 margin-top:3.2rem;
 margin-bottom:1rem;
 font-size: 3.2rem;
 font-weight: bold;
 line-height: 4.4rem;
 letter-spacing: 0%;
 color: var(--color-gray-08);
`
const LedgerWrapper = styled.div`
width : 100%;
display: flex;
flex-direction : column;
    `