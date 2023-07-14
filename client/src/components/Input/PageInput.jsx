import React from "react";
import styled from "styled-components";

const PageInput = ({
  width,
  info,
  size,
  height,
  fontSize,
  onChange,
  ...props
}) => {
  return (
    <InputContainer width={width}>
      <InputField
        size={size}
        height={height}
        fontSize={fontSize}
        onChange={onChange}
        {...props}
      />
      {info && <InputInfo>{info}</InputInfo>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: ${(props) => props.width || "auto"};
`;

const InputField = styled.input`
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.height || "auto"};
  padding: 0.2rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;
  font-size: ${(props) => props.fontSize || "1.4rem"};

  &:focus {
    border-bottom-color: var(--color-blue-03);
  }
`;

const InputInfo = styled.div`
  margin-top: 0.8rem;
  font-size: 1.2rem;
  color: var(--color-red-01);
`;

export default PageInput;
