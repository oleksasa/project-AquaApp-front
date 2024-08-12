import WaterForm from '../WaterForm/WaterForm';
import { useState } from 'react';
import css from './WaterModal.module.css';

const WaterModal = ({ props, onRequestClose, water }) => {
  const [checkId,setCheckId]=useState('');
  if(!props==='add'){
       setCheckId(water._id)
  }
  console.log(water);
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
        <WaterForm onRequestClose={onRequestClose} props={props} waterId={checkId}/>
    </div>
  );
};

export default WaterModal;
