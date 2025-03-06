import { useForm } from 'react-hook-form';

import s from './SignUpForm.module.css';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={s.input} {...register('firstName')} />
      <input className={s.input} {...register('firstName')} />
      <input className={s.input} {...register('firstName')} />
      <input type="submit" />
    </form>
  );
};

export default SignUpForm;
