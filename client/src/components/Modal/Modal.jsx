import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import Portal from "../Portal/Portal";

const Modal = ({
  id,
  open,
  closable = true,
  onClose,
  children,
  bodyStyle = {},
}) => {
  if (!open) return null;

  const ref = useRef(null);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  const handleAnimationEnd = () => {
    close && onClose?.();
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Portal id={id}>
      <StyledModal close={close} onAnimationEnd={handleAnimationEnd}>
        <ModalOverlay onClick={handleClose} />
        <ModalWrapper ref={ref} tabIndex="-1" className="modal-wrapper">
          <ModalBody tabIndex="0" className="modal-body" style={bodyStyle}>
            {closable && (
              <AiOutlineClose
                onClick={handleClose}
                className="modal-close-button"
              />
            )}
            <ModalContent className="modal-content">{children}</ModalContent>
          </ModalBody>
        </ModalWrapper>
      </StyledModal>
    </Portal>
  );
};

export default Modal;

const StyledModal = styled.div`
  ${({ close }) => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    animation: ${close ? fadeOut : fadeIn} 200ms;
    animation-fill-mode: forwards;
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
  outline: 0;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
`;

const ModalBody = styled.div`
  position: relative;
  overflow-y: auto;
  outline: none;
  border-radius: 1rem;
  z-index: 1000;
  min-width: 24rem;
  padding: 2rem;
  background-color: var(--color-gray-02);

  .modal-close-button {
    position: absolute;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
    z-index: 2;
    font-size: 2rem;
  }
`;

const ModalContent = styled.div`
  margin: 0 auto;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
