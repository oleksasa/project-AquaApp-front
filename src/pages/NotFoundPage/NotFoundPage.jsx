import css from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <section className={css.Section404}>
      <div className={css.BackgroundImage404}></div>
      <h1 className={css.Slogan404}>404</h1>
      <div className={css.ContentBox404}>
        <p className={css.message404}>Not Found</p>
        <button onClick={goToHome} className={css.link404}>
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
