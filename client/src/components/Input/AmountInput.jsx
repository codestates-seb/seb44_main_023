import styled from "styled-components";

const AmountInput = ({
  width,
  placeholder,
  size,
  height,
  fontSize,
  value,
  onChange,
  onKeyPress,
}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onChange(inputValue);
  };

  return (
    <AmountInputContainer width={width}>
      <AmountInputWrapper>
        <AmountInputField
          type="text"
          placeholder={placeholder}
          size={size}
          height={height}
          fontSize={fontSize}
          value={value}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
        />
        <CurrencyText>원</CurrencyText>
      </AmountInputWrapper>
    </AmountInputContainer>
  );
};

const AmountInputContainer = styled.div`
  width: ${(props) => props.width || "auto"}rem;
`;

const AmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AmountInputField = styled.input`
  width: ${(props) => props.size || "100%"}rem;
  height: ${(props) => props.height}rem;
  font-size: ${(props) => props.fontSize || "1.4rem"} !important;
  padding: 0.8rem;
  border: none;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;
  text-align: right;

  &:focus {
    border: 2px solid var(--color-blue-03);
  }
`;

const CurrencyText = styled.span`
  margin-left: 0.4rem;
  color: var(--color-gray-05);
  font-size: 1.4rem;
`;

export default AmountInput;
