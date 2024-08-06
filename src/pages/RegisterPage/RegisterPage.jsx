import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';

import css from './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className={css.SignUpWrap}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

// import css from './SignUpPage.module.css';

// const SignUpPage = () => {
//   return (
//     <div className={css.SignUpWrap}>
//       <RegisterForm />
//     </div>
//   );
// };

// export default signUpPage;
