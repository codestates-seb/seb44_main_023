import styled, { css } from "styled-components";

export default function Button(props) {
  const { label, onClick, size, borderColor, fontColor, fontWeight} = props;
  
  return (
    <StyledButton size={size} onClick={onClick} fontColor={fontColor} borderColor={borderColor} fontWeight={fontWeight}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  /* 공통 스타일 */
  border-radius: 30rem;
  cursor: pointer;

  /* 사이즈별 스타일 */
  ${(props) =>
    props.size === "small" &&
    css`
      width: 6.25rem;
      height: 2.083125rem;
      font-size: 12px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      background-color: var(--color-gray-01);
      color: ${props => props.fontColor};
      border-color: ${props => props.borderColor};
      border-style: solid;

      &:hover {
        background-color: var(--color-gray-03);
      }
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 8.625rem;
      height: 2.25rem;
      font-size: 1.25rem;
      font-weight: ${props => props.fontWeight};
      color: white;
      border-color: transparent;
      border-style: solid;
      background-color: var(--color-red-01);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      
      &:hover {
        background-color: var(--color-red-02);
      }
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 10.6875rem;
      height: 2.625rem;
      font-size: 1.375rem;
      font-weight: ${props => props.fontWeight};
      color: var(--color-white);
      border-color: transparent;
      border-style: solid;
      background-color: var(--color-blue-03);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      &:hover {
        background-color: var(--color-blue-04);
      }
    `}
`;
