import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
// import { logInUser } from '../../api/auth.js';
import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import sprite from '../../../public/sprite.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, logIn } from '../../redux/auth/operations.js';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const INITIAL_VALUE = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: INITIAL_VALUE,
    mode: 'onTouched',
  });
  const onSubmit = async data => {
    try {
      await dispatch(logIn(data)).unwrap();
      dispatch(getUserInfo()).unwrap();
      toast.success('User successfully signed in!');
      reset();
      navigate('/tracker');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className={css.LoginWrapper}>
      <form className={css.LoginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.LoginTitle}>Sign In</h1>
        <div className={css.LoginContainer}>
          <label className={css.LoginLabel}>
            <span className={css.LoginName}>Email</span>
            <div className={css.LoginPosition}>
              <input
                className={`${css.LoginInput} ${
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
          <label className={css.LoginLabel}>
            <span className={css.LoginName}>Password</span>
            <div className={css.LoginPosition}>
              <input
                className={`${css.LoginInput} ${
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
                onClick={() => setShowPassword(!showPassword)}
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
        </div>
        <button
          className={css.LoginBtn}
          disabled={!isDirty || !isValid}
          type="submit"
        >
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
