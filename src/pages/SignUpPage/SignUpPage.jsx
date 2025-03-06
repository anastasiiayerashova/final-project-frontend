import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import s from './SignUpPage.module.css';
function SignUpPage() {
  return (
    <div className={s.container}>
      <Logo />
      <h1 className={s.title}>Sign Up</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
