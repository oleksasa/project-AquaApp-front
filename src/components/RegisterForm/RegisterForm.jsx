import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import sprite from '../../../public/sprite.svg';
import { useState } from 'react';
import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations.js';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords don`t match')
    .required('Required'),
});

const INITIAL_VALUE = {
  email: '',
  password: '',
  repeatPassword: '',
};
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: INITIAL_VALUE,
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const onShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const onShowRepeatPassword = () => {
    setShowRepeatPassword(prevState => !prevState);
  };

  const onSubmit = async data => {
    const userData = { ...data };
    delete userData.repeatPassword;
    try {
      await dispatch(signUp(userData)).unwrap();
      toast.success('User successfully registered!');
      reset();
      navigate('/tracker');
    } catch (error) {
      toast.error('Email in use!');
    }
  };

  return (
    <div className={css.RegisterWrapper}>
      <form className={css.RegisterForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.RegisterTitle}>Sign Up</h1>
        <div className={css.RegisterContainer}>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Email</span>
            <div className={css.RegisterPosition}>
              <input
                className={`${css.RegisterInput} ${
                  errors.email ? css.formInputError : ''
                }`}
                type="email"
                {...register('email')}
                autoComplete="email"
                placeholder="Enter your email"
              />
              <div className={css.errorMessageWrapper}>
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
          </label>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Password</span>
            <div className={css.RegisterPosition}>
              <input
                className={`${css.RegisterInput} ${
                  errors.password ? css.formInputError : ''
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
                onClick={onShowPassword}
              >
                <use
                  href={`${sprite}#icon-${showPassword ? 'eye' : 'eye-off'}`}
                ></use>
              </svg>
              <div className={css.errorMessageWrapper}>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
          </label>
          <label className={css.RegisterLabel}>
            <span className={css.RegisterName}>Repeat password</span>
            <div className={css.RegisterPosition}>
              <input
                className={`${css.RegisterInput} ${
                  errors.repeatPassword ? css.formInputError : ''
                }`}
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                autoComplete="new-password"
                placeholder="Repeat password"
              />
              <svg
                width="20"
                height="20"
                className={css.singUpIcon}
                onClick={onShowRepeatPassword}
              >
                <use
                  href={`${sprite}#icon-${
                    showRepeatPassword ? 'eye' : 'eye-off'
                  }`}
                ></use>
              </svg>
              <div className={css.errorMessageWrapper}>
                {errors.repeatPassword && (
                  <p>{errors.repeatPassword.message}</p>
                )}
              </div>
            </div>
          </label>
        </div>
        <button
          disabled={!isDirty || !isValid}
          className={css.RegisterBtn}
          type="submit"
        >
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
