import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const InputField = styled.input`
  width: ${(props) => props.size || "100%"};
  height: ${(props) =>
    props.height || "auto"}; /* 프롭스로 전달된 height 값 사용 */
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  font-size: ${(props) =>
    props.fontSize || "14px"}; /* 프롭스로 전달된 fontSize 값 사용 */

  &:focus {
    border-bottom-color: var(--color-blue-03);
  }
`;

const InputInfo = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-red);
`;

const Input = ({
  placeholder,
  info,
  size,
  height,
  fontSize,
  value,
  onChange,
}) => {
  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder={placeholder}
        size={size}
        height={height} 
        fontSize={fontSize} 
        value={value}
        onChange={onChange}
      />
      {info && <InputInfo>{info}</InputInfo>}
    </InputContainer>
  );
};

export default Input;
