import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import css from './UserSettingsForm.module.css';
import svg from '/sprite.svg';
import clsx from 'clsx';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, updateUserProfile } from '../../redux/auth/operations';
import toast, { Toaster } from 'react-hot-toast';
import { SettingsDefaultValues, SUPPORTED_FORMATS } from '../../constants';
import { selectUser } from '../../redux/auth/selectors.js';
import { fetchMonthlyWater } from '../../redux/water/operations.js';
import { format } from 'date-fns';

export default function UserSettingsForm({ onRequestClose }) {
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState('');

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);

  const PhotoUploadHandler = event => {
    const file = event.currentTarget.files[0];
    if (SUPPORTED_FORMATS.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setAvatar(file);
      setPreviewAvatar(url);
    } else {
      toast.error('Unsupported file format');
    }
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'minimal 3 characters')
      .max(50, 'maximum 50 characters'),
    weight: Yup.number().typeError('Must be a number').nullable(),
    sportTime: Yup.number().typeError('Must be a number').nullable(),
    dailyRateWater: Yup.number().typeError('Must be a number').nullable(),
  });

  const defaultValues = userInfo ? SettingsDefaultValues(userInfo) : {};

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (userInfo) {
      reset(SettingsDefaultValues(userInfo));
    }
  }, [userInfo, reset]);

  const watchedFields = useWatch({
    name: ['weight', 'sportTime', 'dailyRateWater'],
    control,
  });

  useEffect(() => {
    watchedFields.forEach((fieldValue, index) => {
      const fieldName = ['weight', 'sportTime', 'dailyRateWater'][index];

      if ((fieldValue === '' || fieldValue === null || fieldValue === undefined) && fieldValue !== null) {
        setValue(fieldName, null, { shouldValidate: true });
      }
    });
  }, [watchedFields, setValue]);

  const onBlurHandler = (fieldName, value) => {
    if (value === '' || value === null || value === undefined) {
      setValue(fieldName, 0, { shouldValidate: true });
    }
  };

  const onSubmit = async data => {
    toast.success('Successfully updated data');

    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);
    Object.keys(dirtyFields).forEach(key => {
      formData.append(key, data[key]);
    });

    await dispatch(updateUserProfile(formData));
    await dispatch(getUserInfo());
    await dispatch(fetchMonthlyWater(format(new Date(), 'yyyy-MM')));
    onRequestClose();
    setPreviewAvatar('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>
      <Toaster />
      <div className={css.uploadPhotoContainer}>
        {userInfo && (
          <img
            className={css.img}
            src={previewAvatar === '' ? userInfo.avatar : previewAvatar}
            alt="User avatar"
          />
        )}
        <label>
          <button
            className={css.button}
            type="button"
            onClick={() => document.getElementById('file').click()}
          >
            <svg className={css.uploadSvg}>
              <use href={`${svg}#icon-upload`} />
            </svg>
            <input
              className={css.input}
              id="file"
              type="file"
              onChange={PhotoUploadHandler}
            />
            Upload a photo
          </button>
        </label>
      </div>
      <div className={css.formWrapper}>
        <div className={css.firstPart}>
          <div className={css.radioGroup}>
            <h2 className={css.genderTitle}>Your gender identity</h2>
            <div className={css.radioButtonsWrapper}>
              <label>
                <input
                  className={css.radioInput}
                  type="radio"
                  name="gender"
                  value="woman"
                  {...register('gender')}
                />
                <span className={css.customRadio}></span>
                Woman
              </label>
              <label>
                <input
                  className={css.radioInput}
                  type="radio"
                  name="gender"
                  value="man"
                  {...register('gender')}
                />
                <span className={css.customRadio}></span>
                Man
              </label>
            </div>
          </div>
          <div className={css.nameEmailWrapper}>
            <div className={css.name}>
              <label htmlFor="name" className="">
                <h2 className={css.formTitle}>Your name</h2>
                <input
                  {...register('name')}
                  className={clsx(
                    css.formInput,
                    errors.name ? css.errorInput : '',
                  )}
                  name="name"
                  id="name"
                />
              </label>

              {errors.name && (
                <span className={css.errorMessage}>{errors.name.message}</span>
              )}
            </div>
            <div className="">
              <label htmlFor="email" className="">
                <h2 className={css.formTitle}>Email</h2>
                <input
                  className={css.formInput}
                  name="email"
                  id="email disabled"
                  disabled
                  {...register('email')}
                />
              </label>
            </div>
          </div>
          <div className={css.dailyNormaContainer}>
            <h2 className={css.formTitle}>My daily norma</h2>
            <ul className={css.formulaList}>
              <li className={css.listItem}>
                For woman:
                <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>
              </li>
              <li className={css.listItem}>
                For man:
                <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
              </li>
            </ul>
            <div className={css.normaDescriptionContainer}>
              <p>
                <span className={css.normaDescriptionSpan}>*</span> V is the
                volume of the water norm in liters per day, M is your body
                weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
            </div>
            <p className={css.activeTime}>
              <svg className={css.exclamationMarkSvg}>
                <use href={`${svg}#icon-exclamation-mark`} />
              </svg>
              Active time in hours
            </p>
          </div>
        </div>
        <div className={css.secondPart}>
          <div className={css.UserParamsContainer}>
            <div className={css.weight}>
              <label htmlFor="weight" className="">
                <p className={css.formText}>Your weight in kilograms:</p>
                <input
                  className={clsx(
                    css.formInput,
                    errors.weight ? css.errorInput : '',
                  )}
                  name="weight"
                  id="weight"
                  {...register('weight')}
                  onFocus={() => {
                    if (watchedFields[0] === 0) {
                      setValue('weight', '');
                    }
                  }}
                  onBlur={(e) => onBlurHandler('weight', e.target.value)}
                />
              </label>
              {errors.weight && (
                <span className={css.errorMessage}>
                  {errors.weight.message}
                </span>
              )}
            </div>

            <div className="">
              <label htmlFor="sportTime" className="">
                <p className={css.formText}>
                  The time of active participation in sports:
                </p>
                <input
                  className={clsx(
                    css.formInput,
                    errors.sportTime ? css.errorInput : '',
                  )}
                  name="sportTime"
                  id="sportTime"
                  {...register('sportTime')}
                  onFocus={() => {
                    if (watchedFields[1] === 0) {
                      setValue('sportTime', '');
                    }
                  }}
                  onBlur={(e) => onBlurHandler('sportTime', e.target.value)}
                />
              </label>
              {errors.sportTime && (
                <span className={css.errorMessage}>
                  {errors.sportTime.message}
                </span>
              )}
            </div>
          </div>
          <div className={css.waterPerDayContainer}>
            <p className={css.waterPerDayText}>
              The required amount of water in liters per day:
              <span className={css.formula}>{userInfo.dailyRateWater}L</span>
            </p>
            <div className="">
              <label htmlFor="dailyRateWater" className="">
                <h2 className={css.formTitle}>
                  Write down how much water you will drink:
                </h2>
                <input
                  className={clsx(
                    css.formInput,
                    errors.dailyRateWater ? css.errorInput : '',
                  )}
                  name="dailyRateWater"
                  id="dailyRateWater"
                  {...register('dailyRateWater')}
                  onFocus={() => {
                    if (watchedFields[2] === 0) {
                      setValue('dailyRateWater', '');
                    }
                  }}
                  onBlur={(e) => onBlurHandler('dailyRateWater', e.target.value)}
                />
              </label>
              {errors.dailyRateWater && (
                <span className={css.errorMessage}>
                  {errors.dailyRateWater.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className={css.formButton} type="submit">
        Save
      </button>
    </form>
  );
}
