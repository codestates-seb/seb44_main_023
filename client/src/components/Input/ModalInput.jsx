import styled from "styled-components";

const ModalInput = ({
  width,
  height,
  size,
  fontSize,
  onChange,
  suffix,
  suffixSize,
  focused,
  ...props
}) => {
  return (
    <InputContainer width={width}>
      <InputWrapper>
        <InputField
          size={size}
          fontSize={fontSize}
          onChange={onChange}
          height={height}
          focused={focused}
          {...props}
        />
        {suffix && <Suffix size={suffixSize}>{suffix}</Suffix>}
      </InputWrapper>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: ${(props) => props.width || "auto"};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.height || "auto"};
  padding: 0.8rem;
  border: none;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;
  text-align: left;
  font-size: ${(props) => props.fontSize || "1.4rem"};

  &:focus {
    border: ${(props) =>
      props.focused ==="true" ? "2px solid var(--color-blue-03)" : "none"};
  }
`;

const Suffix = styled.div`
  margin-left: 0.8rem;
  color: var(--color-gray-05);
  font-size: ${(props) => props.size || "inherit"};
  cursor: pointer;

  &:hover {
    color: var(--color-blue-03);
  }
`;

export default ModalInput;
