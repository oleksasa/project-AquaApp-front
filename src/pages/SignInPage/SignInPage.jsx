import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import css from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <div className={css.SignInWrap}>
      <LoginForm />
    </div>
  );
};

export default SignInPage;
