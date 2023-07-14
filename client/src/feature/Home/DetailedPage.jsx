import Button from "../../components/Button/Button";
import React, { useState, useEffect,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.


const DetailedPage = ({ onBack , weatherType}) => {
    return (
      <DetailWrapper>
        <Button
                label="뒤로 가기"
                size="large"
                onClick={onBack}
        />
      
        <div>상세 설명 페이지</div>
        <div>서비스에 대한 상세 설명입니다.</div>
      </DetailWrapper>  
    );
  };
  
const slideDownAnimation = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;
  
const DetailedPageComponentWrapper = styled.div`
animation: ${slideDownAnimation} 0.5s ease-in-out;
position: absolute;
top: 100%;
left: 0;
`;
  
  
const DetailWrapper = styled.div`
width:100%;
height:100vh;

background-position: center;
border : green solid 5px;
`
    export default DetailedPage;