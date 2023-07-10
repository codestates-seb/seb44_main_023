import { useState } from "react";
import { styled } from "styled-components";
import Button from "../Button/Button";

const Popconfirm = ({
  children,
  title,
  description,
  cancelText,
  confirmText,
  onCancel = () => {},
  onConfirm,
  down = false,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handlePopupVisible = () => setPopupVisible(!isPopupVisible);

  const handleCancel = () => {
    onCancel();
    handlePopupVisible();
  };

  const handleConfirm = () => {
    onConfirm();
    handlePopupVisible();
  };

  const confirmButton = document.querySelector(".popconfirmButton");
  const confirmButtonWidth = confirmButton?.offsetWidth;

  return (
    <StyledPopconfirm>
      <div className="popconfirmButton" onClick={handlePopupVisible}>
        {children}
      </div>
      {isPopupVisible && <PopupOverlay onClick={handlePopupVisible} />}
      {isPopupVisible && (
        <PopupWrapper
          className="popup"
          left={-((160 - confirmButtonWidth / 2) / 10)}
          down={down}
        >
          <PopupContent className="popup-content">
            <div className="popup-title">{title}</div>
            <div className="popup-description">{description}</div>
            <div className="button-wrapper">
              <Button
                label={cancelText}
                onClick={handleCancel}
                bordercolor="var(--color-blue-03)"
                fontcolor="var(--color-blue-03)"
                size="small"
              />
              <Button
                label={confirmText}
                onClick={handleConfirm}
                bordercolor="var(--color-red-01)"
                fontcolor="var(--color-red-01)"
                size="small"
              />
            </div>
          </PopupContent>
        </PopupWrapper>
      )}
    </StyledPopconfirm>
  );
};

export default Popconfirm;

const StyledPopconfirm = styled.div`
  position: relative;
`;

const PopupWrapper = styled.div`
  position: absolute;
  left: ${({ left }) => left}rem;
  right: 50%;
  z-index: 100;
  width: 32rem;
  ${({ down }) => (down ? "top: 3rem;" : "bottom: 4rem;")}
  background-color: var(--color-gray-01);
  text-align: center;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.25);

  &::after {
    content: " "; /* 정사각형 영역 사용 */
    position: absolute; /* 절대 위치 사용 */
    margin-left: -0.8rem;
    border: 0.8rem solid transparent;
    ${({ down }) =>
      down
        ? "top: -1.5rem; border-bottom-color: var(--color-gray-01);"
        : "border-top-color: var(--color-gray-01);"}
  }
`;

const PopupOverlay = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
`;

const PopupContent = styled.div`
  padding: 4rem 4rem 3.2rem;

  .popup-title {
    font-size: 2rem;
    margin-bottom: 1.6rem;
    color: var(--color-gray-08);
  }

  .popup-description {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
    color: var(--color-red-01);
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    gap: 2rem;

    button {
      padding: 0.4rem 1.6rem;
      font-size: 1.6rem;
      background-color: var(--color-white);
      border-radius: 3rem;
      transition: 200ms;
      cursor: pointer;
    }

    .confirm-button {
      border: 0.1rem solid var(--color-red-01);
      color: var(--color-red-01);

      &:hover {
        background-color: var(--color-red-01);
        color: var(--color-white);
      }
    }

    .cancel-button {
      border: 0.1rem solid var(--color-blue-03);
      color: var(--color-blue-03);

      &:hover {
        background-color: var(--color-blue-03);
        color: var(--color-white);
      }
    }
  }
`;
