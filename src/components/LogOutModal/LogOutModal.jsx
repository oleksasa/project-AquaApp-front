import css from './LogOutModal.module.css';

const LogOutModal = ({onClose}) => {
  return (
    <div className={css.container}>
      <h2 className={css.h2}>Log out</h2>
      <p className={css.p}>Do you really want to leave?</p>
      <div className={css.containerBtn}>
        <button type='button' className={css.delete}>
          Log out
        </button>
        <button type='button' className={css.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
