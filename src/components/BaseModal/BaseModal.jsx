import React from 'react';
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import css from './BaseModal.module.css';

// Налаштування базових стилів для модального вікна
Modal.setAppElement('#root');

const BaseModal = ({ isOpen, onRequestClose, children }) => {
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
          <CgClose className={css.svg} />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default BaseModal;

/* 
    Приклад використання модалки

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <BaseModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <DeleteWaterModal />
      </BaseModal>
    </div>
  );
};
}
*/
