import styled from "styled-components";

const formatAmount = (value) => {
  const numberValue = Number(value.replace(/[^0-9.-]+/g, ""));
  const formattedValue = numberValue.toLocaleString();
  return formattedValue;
};

const AmountInput = ({
  width,
  placeholder,
  size,
  height,
  fontSize,
  $textSize,
  value,
  onChange,
  onKeyPress,
}) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatAmount(inputValue);
    onChange(formattedValue);
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
        <CurrencyText textSize={$textSize}>원</CurrencyText>
      </AmountInputWrapper>
    </AmountInputContainer>
  );
};

const AmountInputContainer = styled.div`
  width: ${(props) => props.width || "auto"};
`;

const AmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AmountInputField = styled.input`
  width: ${(props) => props.size || "100%"};
  height: ${(props) => props.height || "3.2px"};
  font-size: ${(props) => props.fontSize || "1.4rem"} !important;
  padding: 8px;
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
  margin-left: 4px;
  font-size: ${(props) =>
    props.$textSize || "1.2rem"}; // $ 기호를 붙여 shouldForwardProp으로 필터링
  color: var(--color-gray-05);
`;

export default AmountInput;
