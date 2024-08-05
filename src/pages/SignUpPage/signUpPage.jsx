import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import css from './SignUpPage.module.css';

const signUpPage = () => {
  return (
    <div className={css.SignUpWrap}>
      <RegisterForm />
    </div>
  );
};

export default signUpPage;
