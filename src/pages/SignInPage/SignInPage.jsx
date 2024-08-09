import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import css from './SignInPage.module.css';
import { useWindowWidth } from '../../hooks/useWindowWidth.js';

const SignInPage = () => {
  const windowWidth = useWindowWidth();

  return (
    <Layout
      leftComponent={{
        component: (
          <div className={css.SignInWrap}>
            <LoginForm />
          </div>
        ),
        bg: 'var(--color-main-bg)',
      }}
      rightComponent={{
        component: <div>Right</div>,
        bg: 'var(--color-main-bg)',
        hide: windowWidth < 1440,
      }}
    />
  );
};

export default SignInPage;
