import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; 
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { IoChevronBack,IoChevronForward } from "react-icons/io5";
import { useGetIsLedgerNull } from '../../store/store.contentIsNull';
const LedgeSummaryEmpty=()=>{
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
         <LedgerWrapper>
          <LedgerTitle>{ledgerGroupName}</LedgerTitle>
          <div style={{display:"flex",flexDirection:"ro"}}>
          <MonthlyMove> <IoChevronBack /> </MonthlyMove>  
          <MonthlyMove> 6월 </MonthlyMove>
          <MonthlyMove> <IoChevronForward/> </MonthlyMove>
          </div>
          
          <LedgerSummayWapper> 
            <SummayDiv>
                <LeftDiv>이번 달 금액을 추가해주세요</LeftDiv>
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
            <Empty>
              아직 내역이 없습니다. 
            </Empty>
                                  </LedgerListWapper>
          
        </LedgerWrapper>
    
  );
};
    export default LedgeSummaryEmpty;




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


const Empty = styled.div`

  display: flex;
  font-size: 3.0rem;
  line-height: 4.5rem;
  letter-spacing: 0%;
  color: var(--color-black);
`
//  width:100%;
//height:100%;
const LedgerListWapper = styled.div`
display: flex;
 width:100%;
height:100%;
flex-direction: column;
justify-content:center;
align-items: center;
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
   font-size: 2.8rem;
   line-height: 4.2rem;
   letter-spacing: 0%;
   color: var(--color-black);

`

const LedgerSummayWapper = styled.div`
    display: flex;  
    flex-direction: row;
    justify-content:center;
    width : 100%;
    height: 15.6rem;
    //background-color: var(--color-gray-02);
    background-color: #fbfbfa;
    border-top: 0.1rem solid var(--color-gray-03);
    border-bottom: 0.1rem solid var(--color-gray-03);
`

const SummayDiv = styled.div`
    display: flex;  
    flex-direction: row;
    align-items: center;    
    justify-content:center;
    width : 90%;
`
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