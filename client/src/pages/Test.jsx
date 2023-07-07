import React, { useState } from "react";
import styled from "styled-components";
import AmountInput from "../components/Input/AmountInput";

const TestComponent = () => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const numericValue = Number(amount.replace(/[^0-9.-]+/g, ""));
      console.log("금액:", numericValue);
    }
  };

  return (
    <Test>
      <AmountInput
        placeholder="금액을 입력해주세요"
        size="20rem"
        height="90px"
        fontSize="1.6rem"
        value={amount}
        onChange={handleAmountChange}
        onKeyPress={handleKeyPress}
        textSize="12px"
        fontWeight="600" // 폰트 굵기 프롭스 추가
      />
    </Test>
  );
};

const Test = styled.div`
  background-color: #ffedcc;
  height: 500px;
`;

export default TestComponent;
