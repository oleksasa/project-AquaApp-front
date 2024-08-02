import css from './DeleteWaterModal.module.css';

const DeleteWaterModal = () => {
  return (
    <div className={css.container}>
      <h2 className={css.h2}>Delete entry</h2>
      <p className={css.p}>Are you sure you want to delete the entry?</p>
      <div className={css.containerBtn}>
        <button type='button' className={css.delete}>
          Delete
        </button>
        <button type='button' className={css.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
