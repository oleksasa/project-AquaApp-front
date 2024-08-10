import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Logo from '../../components/Logo/Logo';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.home}>
      <Logo />
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}
