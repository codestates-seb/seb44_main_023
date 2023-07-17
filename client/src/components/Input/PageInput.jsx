import React from "react";
import styled, { css } from "styled-components";

const PageInput = ({
  width,
  info,
  size,
  height,
  fontSize,
  onChange,
  eyebutton,
  suffixSize,
  color,
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
      {eyebutton && (
        <SuffixContainer size={suffixSize} color={color}>
          {eyebutton}
        </SuffixContainer>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: ${(props) => props.width || "auto"}rem;
  position: relative;
`;

const InputField = styled.input`
  width: ${(props) => props.size || "100%"}rem;
  height: ${(props) => props.height || "auto"}rem;
  padding: 0.2rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}rem !important;
    `}

  &:focus {
    border-bottom-color: var(--color-blue-03);
  }
`;

const InputInfo = styled.p`
  margin-top: 0.8rem;
  font-size: 1.2rem;
  color: var(--color-red-01);
  word-wrap: break-word;
`;

const SuffixContainer = styled.button`
  position: absolute;
  background-color: transparent;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size || "inherit"}rem;
  cursor: pointer;

  :hover {
    fill: var(--color-blue-04);
  }
`;

export default PageInput;
