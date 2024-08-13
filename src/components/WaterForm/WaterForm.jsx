import React, { useState, useEffect } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import css from './WaterForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWater,
  fetchDailyWater, fetchMonthlyWater,
  updateWater,
} from '../../redux/water/operations';
import { selectIsTodayDay, selectLoading } from '../../redux/water/selectors';
import { format } from 'date-fns';

const schema = yup.object().shape({
  time: yup.string().required('Time required'),
  counter: yup
    .number()
    .typeError('Must be a number')
    .required('Amount required')
    .min(1, 'Min 1 ml')
    .max(1500, 'Max 1500 ml'),
});

const WaterForm = ({ onRequestClose, props, waterId, checkData }) => {
  const isLoading = useSelector(selectLoading);
  const isTodayDay = useSelector(selectIsTodayDay);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(checkData?.volume ?? 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: checkData?.date
        ? String(checkData.date).substring(11, 16)
        : new Date().toTimeString().slice(0, 5),
      counter: checkData?.volume ?? 0,
    },
  });

  // Використовуємо useEffect для установки початкових значень у форму
  useEffect(() => {
    if (checkData?.date) {
      setValue('time', String(checkData.date).substring(11, 16));
    }
    if (checkData?.volume) {
      setValue('counter', checkData.volume);
      setCounter(checkData.volume);
    }
  }, [checkData, setValue]);

  const onSubmit = data => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formatedTime = `${formattedDate}T${data.time}:00Z`;

    if (props === 'add') {
      dispatch(addWater({ date: formatedTime, volume: data.counter }));
      dispatch(fetchDailyWater(formattedDate));
      dispatch(fetchMonthlyWater(format(new Date(), 'yyyy-MM')));
      onRequestClose();
      return;
    }

    dispatch(
      updateWater({ _id: waterId, date: formatedTime, volume: data.counter }),
      dispatch(fetchDailyWater(String(checkData.date).substring(0, 10))),
    );
    onRequestClose();
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
        <button type="button" className={css.minus} onClick={minus}>
          <CiCircleMinus className={css.svg} />
        </button>
        <div className={css.counterInfo}>
          <span>{counter}</span> ml
        </div>
        <button type="button" className={css.plus} onClick={plus}>
          <CiCirclePlus className={css.svg} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.timeP}>
          Recording time:
          <input type="time" {...register('time')} className={css.input} />
          {errors.time && <p className={css.error}>{errors.time.message}</p>}
        </label>
        <label className={css.valueP}>
          Enter the value of the water used:
          <input
            className={css.input}
            type="number"
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
        <button type="submit" className={css.btnSubmit} disabled={!isTodayDay}>
          Save{' '}
          {isLoading && (
            <div className={css.loader}>
              <div className={css.orbe} style={{ '--index': 0 }}></div>
              <div className={css.orbe} style={{ '--index': 1 }}></div>
              <div className={css.orbe} style={{ '--index': 2 }}></div>
              <div className={css.orbe} style={{ '--index': 3 }}></div>
              <div className={css.orbe} style={{ '--index': 4 }}></div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default WaterForm;
