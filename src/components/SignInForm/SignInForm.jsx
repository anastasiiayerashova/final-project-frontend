import React, { useState, useId } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './SignInForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { registerUserOperation } from '../../redux/user/operations.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton.jsx';

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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailId = useId()
  const pwdId = useId()

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  });

  const onSubmit = (values) => {
    dispatch(loginUserOperation({
      email: values.email,
      password: values.password
    }))
    .unwrap()
      .then((res) => {
      toast.success(`Welcome, ${values.email}!`, {
      style: {
        backgroundColor: 'white',
        color: 'green'
      }
    })
        reset()
        navigate('/tracker')
      })
      .catch((e) => {
      toast.error('Please, try again', {
      style: {
         backgroundColor: 'white',
         color: 'red',
      },
    });
    })
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
            <label htmlFor={emailId}>Email</label>
            <input
              id={emailId}
              type="text"
              {...register('email')}
              onBlur={() => trigger('email')}
              placeholder="Enter your email"
              className={errors.email ? `${s.inputError}` : ''}
            />

            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={pwdId}>Password</label>
            <div className={s.icon}>
              <input
                id={pwdId}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                onBlur={() => trigger('password')}
                placeholder="Enter your password"
                className={errors.password ? `${s.inputError}` : ''}
              />
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
              <button className={s.eyeIcon} onClick={togglePasswordVisibility} type='button'> 
                {showPassword ? <svg width="20" height="20">
                  <use href='/sprite.svg#eye-off' />
                </svg> : <svg width="20" height="20">
                  <use href='/sprite.svg#eye' />
                </svg>}
              </button>
            </div>
          </div>
        <div className={s.buttonWrapper}>
          <button type="submit" className={s.button}>
            Sign In
          </button>
            <GoogleAuthButton text={'Sign in with Google'} />
          </div>
        </form>
     <div className={s.helpersWrapper}>
        <div className={s.wrapperUp}>
          <p className={s.account}>Don’t have an account?&nbsp;</p>
          <a href="/signup" className={s.signup}>
            Sign Up
          </a>
        </div>
        <div className={s.wrapperUp}>
         <p className={s.account}>Need help?&nbsp;</p>
          <a href="/reset-pwd-email" className={s.signup}>
            Reset your password
          </a>
        </div>
       </div>
      </div>
    </div>
  );
};

export default SignInForm;
