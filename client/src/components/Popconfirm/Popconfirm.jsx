import { useState } from "react";
import { styled } from "styled-components";

const Popconfirm = ({
  children,
  title,
  description,
  cancelText,
  confirmText,
  onCancel = () => {},
  onConfirm,
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
        <PopupWrapper className="popup" left={-(160 - confirmButtonWidth / 2)}>
          <PopupContent className="popup-content">
            <div className="popup-title">{title}</div>
            <div className="popup-description">{description}</div>
            <div className="button-wrapper">
              <button onClick={handleCancel} className="cancel-button">
                {cancelText}
              </button>
              <button onClick={handleConfirm} className="confirm-button">
                {confirmText}
              </button>
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
  left: ${({ left }) => left}px;
  right: 50%;
  z-index: 100;
  width: 320px;
  bottom: 40px;
  background-color: var(--color-white);
  text-align: center;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);

  &::after {
    content: " "; /* 정사각형 영역 사용 */
    position: absolute; /* 절대 위치 사용 */
    margin-left: -8px;
    border: 8px solid transparent;
    border-top-color: var(--color-white);
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
  padding: 40px 40px 32px;

  .popup-title {
    font-size: 20px;
    margin-bottom: 16px;
    color: var(--color-gray-08);
  }

  .popup-description {
    font-size: 16px;
    margin-bottom: 16px;
    color: var(--color-red);
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
      padding: 4px 16px;
      font-size: 16px;
      background-color: var(--color-white);
      border-radius: 30px;
      transition: 200ms;
      cursor: pointer;
    }

    .confirm-button {
      border: 1px solid var(--color-red);
      color: var(--color-red);

      &:hover {
        background-color: var(--color-red);
        color: var(--color-white);
      }
    }

    .cancel-button {
      border: 1px solid var(--color-blue-03);
      color: var(--color-blue-03);

      &:hover {
        background-color: var(--color-blue-03);
        color: var(--color-white);
      }
    }
  }
`;
