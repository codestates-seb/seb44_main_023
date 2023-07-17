import React from 'react';
import styled from 'styled-components';
import smallLogo from "../../assets/home/smallLogo.svg";

const Detail = () => {
    return (
      <DetailWarpper>
        <DetailContainer>
          <DetailHeader>
          </DetailHeader>
             <DetailBody>
              <DetailDivRow>
              <SmallLogo src={smallLogo}></SmallLogo>
              <Text>   : Plan, Finance 그리고 Infinity 의 합성어로 무한한 가능성과 편의성을 제공합니다 </Text>
              </DetailDivRow>
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
  margin-left : 1rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`
const DetailDivRow= styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  margin-top: 13.5rem;
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
  margin-left : 3rem;

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
 flex-direction:column;
  justify-content:center;

    width:100%;

  height: 90%;
`

const DetailContainer = styled.div`
  width:100%;
  display:flex;
  background-position: center;
`;

const DetailWarpper = styled.div`
  background-position: center;
  width:100%;
  height: 100vh;
  display: flex;
  
`


  export default Detail;