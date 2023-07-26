import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LedgerAmount = ({ onAmoutValue, value }) => {

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^\d]/g, "");
    value(value);
  };

  const handleInputBlur = () => {
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue <= 0) {
      value(null);
    } else {
      value(numberValue.toString());
    }
  };

  return (
    <InputWrapper>
      <Input
        // number로 하면 한글자만 들어가는 오류 있어서 text로 설정
        type="text"
        placeholder="금액"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onAmoutValue={onAmoutValue(value)}
      />
      <WonSign>₩</WonSign>
    </InputWrapper>
  );
};

export default LedgerAmount;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WonSign = styled.span`
  margin-left: 0.5rem;
`;
const Input = styled.input`
  background-color: transparent;
  text-align: center;
  border: none; // 기본적인 input 스타일 초기화
  outline: none; // 포커스 시 기본적인 외곽선 제거
  font-size: 16px;
`;
