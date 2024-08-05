import React, { useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import css from './WaterForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Створюємо схему валідації за допомогою yup
const schema = yup.object().shape({
  time: yup.string().required('Time required'),
  counter: yup
    .number()
    .typeError('Must be a number')
    .required('Amount required')
    .min(1, 'Min 1 ml')
    .max(1500, 'Max 1500 ml'),
});

const WaterForm = () => {
  const [counter, setCounter] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: new Date().toTimeString().slice(0, 5),
      counter: 0,
    },
  });

  const onSubmit = data => {
    // Перевірка, якщо counter = 0
    if (data.counter === 0) {
      // Додаємо помилку у форму через setError
      setValue('counter', 0);
      return; // Скасовуємо відправку форми
    }

    // Перевірка на додаткові умови
    if (data.time !== new Date().toTimeString().slice(0, 5)) {
      // Додаємо помилку у форму через setError
      setValue('time', new Date().toTimeString().slice(0, 5));
      return; // Скасовуємо відправку форми
    }

    // Якщо всі перевірки пройдено, показуємо дані
    alert(JSON.stringify(data));
  };

  const minus = () => {
    const newValue = Math.max(counter - 50, 0);
    setCounter(newValue);
    setValue('counter', newValue);
  };

  const plus = () => {
    const newValue = counter + 50;
    if (newValue > 1500) {
      setCounter(1500);
      setValue('counter', 1500);
      return;
    }
    setCounter(newValue);
    setValue('counter', newValue);
  };

  const changeNumber = e => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (value > 1500) return;

    if (!isNaN(numericValue) && numericValue >= 0) {
      setCounter(numericValue);
      setValue('counter', numericValue);
    } else {
      setCounter(0);
      setValue('counter', 0);
    }
  };

  return (
    <div className={css.info}>
      <p className={css.p}>Amount of water:</p>
      <div className={css.counter}>
        <button type='button' className={css.minus} onClick={minus}>
          <CiCircleMinus className={css.svg} />
        </button>
        <div className={css.counterInfo}>
          <span>{counter}</span> ml
        </div>
        <button type='button' className={css.plus} onClick={plus}>
          <CiCirclePlus className={css.svg} />
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
          {errors.time && <p className={css.error}>{errors.time.message}</p>}
        </label>
        <label className={css.valueP}>
          Enter the value of the water used:
          <input
            className={css.input}
            type='number'
            {...register('counter')}
            min={0}
            max={1500}
            value={counter}
            onChange={changeNumber}
          />
          {errors.counter && (
            <p className={css.error}>{errors.counter.message}</p>
          )}
        </label>
        <button type='submit' className={css.btnSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default WaterForm;
