import { useDispatch } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import { deleteWater, fetchDailyWater } from '../../redux/water/operations';

const DeleteWaterModal = ({ onClose, waterId, waterDate }) => {
  const dispatch = useDispatch();

  const deleteWaterRequest = () => {
    dispatch(deleteWater(waterId));
    dispatch(fetchDailyWater(String(waterDate).substring(0, 10)));
    onClose();
  };
  return (
    <div className={css.container}>
      <h2 className={css.h2}>Delete entry</h2>
      <p className={css.p}>Are you sure you want to delete the entry?</p>
      <div className={css.containerBtn}>
        <button
          type="button"
          className={css.delete}
          onClick={deleteWaterRequest}
        >
          Delete
        </button>
        <button type="button" className={css.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
