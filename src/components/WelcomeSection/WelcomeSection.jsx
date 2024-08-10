import { Link } from 'react-router-dom';
import css from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <div className={css.welcome}>
      <p className={css.text}>Record daily water intake and track</p>
      <h1 className={css.header}>Water consumption tracker</h1>
      <div className={css.links}>
        <Link to="/signup" className={css.register}>
          Try tracker
        </Link>
        <Link to="/signin" className={css.login}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
