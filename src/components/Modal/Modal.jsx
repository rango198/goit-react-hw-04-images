import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Close, ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ children, close }) => {
  const closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <Close onClick={close}>X</Close>
        {children}
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};
