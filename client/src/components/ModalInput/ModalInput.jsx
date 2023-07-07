import React, { useState } from "react";
import styled from "styled-components";

// 최소크기 768
// px을 rem으로 변경 필요

const InputContainer = styled.div`
  width: ${(props) => props.width || "auto"};
`;

const InputWrapper = styled.div`
  position: relative; /* 추가된 부분 */
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  width: ${(props) => props.size || "100%"};
  padding: 8px;
  border: none;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;

  &:focus {
    border-bottom-color: var(--color-blue-03);
    border: 2px solid var(--color-blue-03);
  }
`;

const Suffix = styled.div`
  position: absolute; /* 추가된 부분 */
  top: 10px; /* 추가된 부분 */
  right: 970px; /* 추가된 부분 */
  margin-left: 8px;
  color: var(--color-blue-03);
  cursor: pointer;
`;

const Input = ({
  label,
  placeholder,
  info,
  size,
  value,
  onChange,
  suffix,
  width,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <InputContainer width={width}>
      <label>{label}</label>
      <InputWrapper>
        <InputField
          type={type}
          placeholder={placeholder}
          size={size}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            borderBottomColor: isFocused ? "var(--color-blue-03)" : "#ccc",
            borderWidth: isFocused ? "2px" : "1px",
          }}
        />
        {suffix && <Suffix>{suffix}</Suffix>}
      </InputWrapper>
      {info && <div>{info}</div>}
    </InputContainer>
  );
};

export default Input;
