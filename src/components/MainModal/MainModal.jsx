import Modal from "react-modal";
import css from "./MainModal.module.css";
import svg from "/sprite.svg";

Modal.setAppElement("#root");

const MainModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <button className={css.closeBtn} onClick={onRequestClose}>
        <svg className={css.closeBtnSvg}>
          <use href={`${svg}#icon-close-btn`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
};

export default MainModal;
