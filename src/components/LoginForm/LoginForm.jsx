import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { logInUser } from '../../api/auth.js';
import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import sprite from '../../../public/sprite.svg';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Password is required'),
});

const initialValue = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
      await logInUser(data);
      toast.success('User successfully logged in');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  return (
    <div className={css.LoginWrapper}>
      <form className={css.LoginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.LoginTitle}>Sign In</h1>
        <div className={css.LoginContainer}>
          <label className={css.LoginLabel}>
            <span className={css.LoginName}>Email</span>
            <input
              className={`${css.LoginInput} ${
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
          <label className={css.LoginLabel}>
            <span className={css.LoginName}>Password</span>
            <div className={css.LoginPosition}>
              <input
                className={`${css.LoginInput} ${
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
        </div>
        <button className={css.LoginBtn} type="submit">
          Sign In
        </button>
        <div className={css.LoginChange}>
          <p className={css.LoginText}>
            Don’t have an account?
            <Link className={css.LoginLink} to={'/signup'}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
