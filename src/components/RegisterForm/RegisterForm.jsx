// import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import sprite from '../../../public/sprite.svg';
import { useState } from 'react';
import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { registerUser } from '../../api/auth.js';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});
const initialValue = {
  email: '',
  password: '',
  repeatPassword: '',
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const onSubmit = async data => {
    try {
      const response = await registerUser(data);
      toast.success('User successfully registered');
      if (response) {
        navigate('/signin');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={css.RegisterWrapper}>
      <form className={css.RegisterForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.RegisterTitle}>Sign Up</h1>
        <div className={css.RegisterContainer}>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Email</span>
            <input
              className={`${css.RegisterInput} ${
                errors.email && touchedFields.email
                  ? css.formInputError
                  : touchedFields.email
                  ? css.formInputValid
                  : ''
              }`}
              type="email"
              {...register('email')}
              autoComplete="email"
              placeholder="Enter your email"
            />
            {errors.email && touchedFields.email ? (
              <div className={css.errorMsg}>{errors.email.message}</div>
            ) : null}
          </label>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Password</span>
            <div className={css.RegisterPosition}>
              <input
                className={`${css.RegisterInput} ${
                  errors.password && touchedFields.password
                    ? css.formInputError
                    : touchedFields.password
                    ? css.formInputValid
                    : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="new-password"
                placeholder="Enter your password"
              />
              <svg
                width="20"
                height="20"
                className={css.singUpIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <use
                  href={`${sprite}#icon-${showPassword ? 'eye' : 'eye-off'}`}
                ></use>
              </svg>
              {errors.password && touchedFields.password ? (
                <div className={css.errorMsg}>{errors.password.message}</div>
              ) : null}
            </div>
          </label>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Repeat password</span>
            <div className={css.RegisterPosition}>
              <input
                className={`${css.RegisterInput} ${
                  errors.repeatPassword && touchedFields.repeatPassword
                    ? css.formInputError
                    : touchedFields.repeatPassword
                    ? css.formInputValid
                    : ''
                }`}
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="new-password"
                placeholder="Repeat password"
              />
              <svg
                width="20"
                height="20"
                className={css.singUpIcon}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                <use
                  href={`${sprite}#icon-${
                    showRepeatPassword ? 'eye' : 'eye-off'
                  }`}
                ></use>
              </svg>
              {errors.repeatPassword && touchedFields.repeatPassword ? (
                <div className={css.errorMsg}>
                  {errors.repeatPassword.message}
                </div>
              ) : null}
            </div>
          </label>
        </div>
        <button className={css.RegisterBtn} type="submit">
          Sign Up
        </button>
        <div className={css.RegisterChange}>
          <p className={css.RegisterText}>
            Already have account?
            <Link className={css.RegisterLink} to={'/signin'}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
