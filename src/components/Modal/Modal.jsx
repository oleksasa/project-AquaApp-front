import { CgClose } from 'react-icons/cg';
import css from './Modal.module.css';
import { useState } from 'react';

const Modal = ({ children }) => {
  const [open, isOpen] = useState(true);

  const handleClick = () => isOpen(!open);

  return (
    <>
      {open ? (
        <div className={css.modal}>
          <div className={css.info}>
            <button type='button' className={css.btn} onClick={handleClick}>
              <CgClose className={css.svg} fontSize={'24px'} />
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
