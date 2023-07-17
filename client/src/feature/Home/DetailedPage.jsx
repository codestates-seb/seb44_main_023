import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import smallLogo from "../../assets/home/smallLogo.svg";

const DetailedPage = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
   
    return (
      <DetailWarpper>
        <DetailContainer>
          <DetailHeader>
            <SmallLogo src={smallLogo}></SmallLogo>
          </DetailHeader>
            <DetailBody>
              <ContentsDiv>
               <Text> 서비스 상세 내용입니다. </Text>
              </ContentsDiv>
            </DetailBody>

        </DetailContainer>
      </DetailWarpper>
    
    );
  };


const Text = styled.div`
  font-size: 2.0rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`
const DetailDivRow= styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 13.5rem;
 `
const DetailDivCol= styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`
const ContentsDiv=styled.div`
  width:90%;
  height: 85%;
  background: rgba(255, 255, 255, 0.4);
  padding : 2rem  2rem 2rem 2rem;
  border-radius: 3rem;
 justify-content: center;
 align-items: center;
`
const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`

const DetailHeader = styled.div`
  position: relative;;
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-left:7.2rem ;
  height: 10%;
`;

const DetailBody = styled.div`
 display: flex;
  justify-content:center;
  align-items: center;
  height: 90%;
`
const DetailContainer = styled.div`
  width:100%;
  background-position: center;
`;

const DetailWarpper = styled.div`
  background-position: center;
  width:100%;
  height: 100vh;
  display: flex;
`

export default DetailedPage;