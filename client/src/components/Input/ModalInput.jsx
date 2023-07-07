import styled from "styled-components";

const Input = ({
  type,
  width,
  height,
  placeholder,
  size,
  value,
  onChange,
  suffix,
  focused,
}) => {
  return (
    <InputContainer width={width}>
      <InputWrapper>
        <InputField
          type={type}
          placeholder={placeholder}
          size={size}
          value={value}
          onChange={onChange}
          height={height}
          focused={focused}
        />
        {suffix && <Suffix>{suffix}</Suffix>}
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

  &:focus {
    border: ${(props) =>
      props.focused ? "2px solid var(--color-blue-03)" : "none"};
  }
`;

const Suffix = styled.div`
  margin-left: 0.8rem;
  color: var(--color-gray-05);
  cursor: pointer;

  &:hover {
    color: var(--color-blue-03);
  }
`;

export default Input;
