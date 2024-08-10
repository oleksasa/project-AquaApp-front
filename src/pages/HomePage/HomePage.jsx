import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import css from './HomePage.module.css';
import { Layout } from '../../components/layouts/Layout/Layout';

export default function HomePage() {
  return (
    <Layout
      leftComponent={{
        component: (
          <div className={css.home}>
            <WelcomeSection />
          </div>
        ),
        bg: 'var(--color-main-bg)',
      }}
      rightComponent={{
        component: <AdvantagesSection />,
        bg: 'var(--color-main-bg)',
      }}
    />
  );
}
