import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import s from './SignInForm.module.css';

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

const SignInForm = () => {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({ resolver: yupResolver(schema) });

  //   const onSubmit = (data) => {
  //     console.log(data);
  //     alert('Form submitted successfully!');
  //   };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h3 className={s.title}>Sign In</h3>
        <form className={s.form}>
          <div className={s.inputGroup}>
            <label>Email</label>
            <input type="text" placeholder="Enter your email" />
          </div>

          <div className={s.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className={s.button}>
            Sign In
          </button>
        </form>

        <div className={s.wrapperUp}>
          <p className={s.account}>Don’t have an account?&nbsp;</p>
          <a href="" className={s.signup}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import s from './SignInForm.module.css';

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const SignInForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = (data) => {
//     console.log(data);
//     alert('Form submitted successfully!');
//   };

//   return (
//     <div className={s.container}>
//       <h3 className={s.title}>Sign In</h3>
//       <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
//         <div className={s.inputGroup}>
//           <label>Email</label>
//           <input
//             type="text"
//             {...register('email')}
//             placeholder="Enter your email"
//           />
//           {errors.email && <p className={s.error}>{errors.email.message}</p>}
//         </div>

//         <div className={s.inputGroup}>
//           <label>Password</label>
//           <input
//             type="password"
//             {...register('password')}
//             placeholder="Enter your password"
//           />
//           {errors.password && (
//             <p className={s.error}>{errors.password.message}</p>
//           )}
//         </div>

//         <button type="submit" className={s.button}>
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignInForm;
