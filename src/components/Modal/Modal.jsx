import React from 'react';
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import css from './Modal.module.css';

// Налаштування базових стилів для модального вікна
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.info}>
        <button type='button' className={css.btn} onClick={onRequestClose}>
          <CgClose className={css.svg} fontSize={'24px'} />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
