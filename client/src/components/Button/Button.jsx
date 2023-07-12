import styled, { css } from "styled-components";

export default function Button(props) {
  const {
    label,
    onClick,
    size,
    bordercolor,
    fontcolor,
    fontWeight,
    ...restProps
  } = props;

  return (
    <StyledButton
      size={size}
      onClick={onClick}
      fontcolor={fontcolor}
      bordercolor={bordercolor}
      fontWeight={fontWeight}
      {...restProps}
    >
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
      width: 10rem;
      height: 3.3rem;
      font-size: 12px;
      font-weight: ${(props) => props.fontWeight};
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      background-color: var(--color-gray-01);
      color: ${(props) => props.fontcolor};
      border: 0.15rem solid ${(props) => props.bordercolor};

      &:hover {
        filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 13.8rem;
      height: 3.6rem;
      font-size: 2rem;
      font-weight: ${(props) => props.fontWeight};
      color: white;
      border-color: transparent;
      border-style: solid;
      background-color: var(--color-red-01);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      &:hover {
        filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }
    `}

  ${(props) =>
    props.size === "large" &&
    css`
      width: 17.1rem;
      height: 4.2rem;
      font-size: 2.2rem;
      font-weight: ${(props) => props.fontWeight};
      color: var(--color-white);
      border-color: transparent;
      border-style: solid;
      background-color: var(--color-blue-03);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      &:hover {
        filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }
    `}
`;