
import { Suspense, lazy } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import { useWindowWidth } from '../../hooks/useWindowWidth.js';
import css from './SignUpPage.module.css';

const AdvantagesSection = lazy(() =>
  import('../../components/AdvantagesSection/AdvantagesSection.jsx'),
);

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
        component: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdvantagesSection />
          </Suspense>
        ),
        bg: 'var(--color-main-bg)',
        hide: windowWidth < 1440,
      }}
    />
  );
};

export default SignUpPage;
