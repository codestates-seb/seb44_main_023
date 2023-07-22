import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LedgerAmount = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^\d]/g, "");
    if (filteredValue === "") {
      localStorage.removeItem("ledgerAmount");
    } else {
      localStorage.setItem("ledgerAmount", filteredValue);
    }
    setValue(filteredValue);
  };

  const handleInputBlur = () => {
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue <= 0) {
      setValue("0");
    } else {
      setValue(numberValue.toString());
    }
  };
  
  return (
    <InputWrapper>
      <Input
        type="text" // 숫자 외에는 입력되지 않도록 타입을 text로 변경
        placeholder="금액"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
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
