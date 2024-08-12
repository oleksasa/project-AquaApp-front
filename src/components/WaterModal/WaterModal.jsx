import WaterForm from '../WaterForm/WaterForm';
import { useEffect, useState } from 'react';
import css from './WaterModal.module.css';

const WaterModal = ({ props, onRequestClose, water }) => {
  const [checkId, setCheckId] = useState('');
  const [checkData, setcheckData] = useState('');

  useEffect(() => {
    if (props !== 'add') {
      setCheckId(water._id);
      setcheckData(water);
    }
  }, [props, water]);

  return (
    <div className={css.container}>
      {props === 'add' ? (
        <>
          <h2 className={css.h2}>Add water</h2>
          <p className={css.p}>Choose a value</p>
        </>
      ) : (
        <>
          <h2 className={css.h2}>Edit the entered amount of water</h2>
          <p className={css.p}>Correct entered data:</p>
        </>
      )}
      <WaterForm
        onRequestClose={onRequestClose}
        props={props}
        waterId={checkId}
        checkData={checkData}
      />
    </div>
  );
};

export default WaterModal;
