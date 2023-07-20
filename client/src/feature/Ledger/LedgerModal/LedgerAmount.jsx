import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LedgerAmount = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const reversedValue = inputValue.split("").reverse().join("");
    setValue(reversedValue);
  };

  const handleInputBlur = () => {
    const numberValue = parseInt(value.split("").reverse().join(""), 10);
    if (isNaN(numberValue) || numberValue <= 0) {
      setValue("0");
    } else {
      setValue(numberValue.toString().split("").reverse().join(""));
    }
  };
  return (
    <InputWrapper>
      <Input
        type="number"
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
`;
