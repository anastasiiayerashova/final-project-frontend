import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { GoogleLogin } from 'react-google-login';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://your-backend.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      localStorage.setItem('token', result.token);
      navigate('/tracker');
    } catch (error) {
      alert(error.message);
      setError('email', { type: 'server', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              {...register('email')}
              placeholder="Enter your email"
              className={errors.email ? s.inputError : ''}
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
                className={errors.password ? s.inputError : ''}
              />
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
              <button
                type="button"
                className={s.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20">
                    <use href="../../../public/sprite.svg#eye" />
                  </svg>
                ) : (
                  <svg width="20" height="20">
                    <use href="../../../public/sprite.svg#eye-off" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={s.inputGroup}>
            <label>Repeat Password</label>
            <div className={s.icon}>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                placeholder="Repeat your password"
                className={errors.repeatPassword ? s.inputError : ''}
              />
              {errors.repeatPassword && (
                <p className={s.error}>{errors.repeatPassword.message}</p>
              )}

              <button
                type="button"
                className={s.eyeIcon}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20">
                    <use href="../../../public/sprite.svg#eye" />
                  </svg>
                ) : (
                  <svg width="20" height="20">
                    <use href="../../../public/sprite.svg#eye-off" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className={s.button} disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className={s.wrapperUp}>
          <span className={s.account}>Already have an account?&nbsp;</span>
          <a href="/signin" className={s.signup}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
