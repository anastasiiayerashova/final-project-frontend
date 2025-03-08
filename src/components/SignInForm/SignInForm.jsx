import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './SignInForm.module.css';
import Logo from '../Logo/Logo.jsx';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .min(3, 'Email must be at least 3 characters')
    .max(50, 'Email cannot exceed 50 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
});

const SignInForm = () => {

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    toast.success(`Welcome, ${data.email}!`, {
      style: {
        backgroundColor: 'white',
        color: 'green'
      }
    })
    reset()
  }

  const onError = (errors) => {
    toast.error('Please, try again', {
      style: {
         backgroundColor: 'white',
         color: 'red',
      },
    });
  };

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
          <div className={s.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              {...register('email')}
              placeholder="Enter your email"
              className={errors.email ? `${s.inputError}` : ''}
            />

            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.inputGroup}>
            <label>Password</label>
            <div className={s.icon}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                className={errors.password ? `${s.inputError}` : ''}
              />
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
              <button className={s.eyeIcon} onClick={togglePasswordVisibility}> 
                {showPassword ? <svg width="20" height="20">
                  <use href='/sprite.svg#eye-off' />
                </svg> : <svg width="20" height="20">
                  <use href='/sprite.svg#chevron-left' />
                </svg>}
              </button>
            </div>
          </div>

          <button type="submit" className={s.button}>
            Sign In
          </button>
        </form>

        <div className={s.wrapperUp}>
          <p className={s.account}>Don’t have an account?&nbsp;</p>
          <a href="/signup" className={s.signup}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
