import { styled } from "styled-components";

const Toggle = ({ checked, onClick }) => {
  return (
    <StyledWrapper className="switch">
      <input type="checkbox" checked={checked} readOnly />
      <span className="slider round" onClick={onClick} />
    </StyledWrapper>
  );
};

export default Toggle;

const StyledWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-gray-03);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--color-blue-03);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--color-blue-03);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(28px);
    -ms-transform: translateX(28px);
    transform: translateX(28px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
