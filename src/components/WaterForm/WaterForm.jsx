import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import css from './WaterForm.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const WaterForm = () => {
  const [counter, setCouter] = useState(0);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => alert(JSON.stringify(data));

  const minus = () => {
    if (counter - 50 > 0) {
      return setCouter(counter - 50);
    }
    setCouter(0);
  };

  const plus = () => {
    setCouter(counter + 50);
  };

  const changeNumber = e => {
    const value = e.target.value;

    if (!isNaN(value) && value.trim() !== '') {
      setCouter(Number(value));
    } else {
      setCouter(0);
    }
  };

  return (
    <>
      <p className={css.p}>Amount of water:</p>
      <div className={css.counter}>
        <button type='button' className={css.minus} onClick={minus}>
          <CiCircleMinus fontSize={'40px'} />
        </button>
        <div className={css.counterInfo}>
          <span>{counter}</span> ml
        </div>
        <button type='button' className={css.plus} onClick={plus}>
          <CiCirclePlus fontSize={'40px'} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.timeP}>
          Recording time:
          <input
            type='time'
            {...register('time')}
            className={css.input}
            defaultValue={new Date().toTimeString().slice(0, 5)}
          />
        </label>
        <label className={css.valueP}>
          Enter the value of the water used:
          <input
            className={css.input}
            type='text'
            {...register('counter')}
            min={0}
            value={counter}
            onChange={changeNumber}
          />
        </label>
        <button type='submit' className={css.btnSubmit}>
          Save
        </button>
      </form>
    </>
  );
};

export default WaterForm;
