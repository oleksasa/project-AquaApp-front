import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Layout } from '../../components/layouts/Layout/Layout';
import { useWindowWidth } from '../../hooks/useWindowWidth.js';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  const windowWidth = useWindowWidth();

  return (
    <Layout
      leftComponent={{
        component: (
          <div className={css.SignUpWrap}>
            <RegisterForm />
          </div>
        ),
        bg: 'var(--color-main-bg)',
      }}
      rightComponent={{
        component: <div className={css.rightComponentStyle}>Right</div>,
        bg: 'var(--color-main-bg)',
        hide: windowWidth < 1440,
      }}
    />
  );
};

export default SignUpPage;
