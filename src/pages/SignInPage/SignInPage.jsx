import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import css from './SignInPage.module.css';
import { useWindowWidth } from '../../hooks/useWindowWidth.js';
import { Suspense, lazy } from 'react';

const AdvantagesSection = lazy(() =>
  import('../../components/AdvantagesSection/AdvantagesSection.jsx'),
);

const SignInPage = () => {
  const windowWidth = useWindowWidth();

  return (
    <Layout
      leftComponent={{
        component: <LoginForm />,
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

export default SignInPage;
