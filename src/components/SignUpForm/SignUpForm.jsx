import React, { useState, useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { registerUserOperation } from '../../redux/user/operations.js';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton.jsx';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i, 
      'Enter a valid email'
    )
    .min(3, 'Email must be at least 3 characters')
    .max(50, 'Email cannot exceed 50 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .min(3, 'Password must be at least 3 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const emailId = useId()
  const pwdId = useId()
  const repeatPwdId = useId()

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword)

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: { email: '', password: '', repeatPassword: '' },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    dispatch(registerUserOperation({
      email: values.email,
      password: values.password
    }))
      .unwrap()
      .then((res) => {
      localStorage.setItem('token', res.token)
      toast.success(`Welcome, ${values.email}!`, {
      style: {
        backgroundColor: 'white',
        color: 'green'
      }
      })
        setIsSubmitting(false)
        reset()
        navigate('/tracker')
      })
      .catch((e) => {
        let errorMessage = 'Please, try again';
        
        if (e) {
            errorMessage = 'Email in use'
        }
        else {
          errorMessage = e.response.data?.message || 'Something went wrong'
        }
        
        setIsSubmitting(false)
        toast.error(errorMessage, {
          style: {
            backgroundColor: 'white',
            color: 'red',
        },
    });
    })
  };

  const onError = (errors) => {
    toast.error('Please, try again', {
      style: {
         backgroundColor: 'white',
         color: 'red',
      },
    });
  };

    const emailValue = watch('email');
    const pwdValue = watch('password');
    const repeatPwdValue = watch('repeatPassword')

    useEffect(() => {
      if (emailValue) {
         trigger('email'); 
        }
    }, [emailValue, trigger]);


    useEffect(() => {
      if (pwdValue) {
         trigger('password');
        }
    }, [pwdValue, trigger]);
  
    useEffect(() => {
      if (repeatPwdValue) {
         trigger('repeatPassword');
        }
    }, [repeatPwdValue, trigger]);

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
        <LanguageButtons/>
      </div>
      <div className={s.menu_container}>
        <h2 className={s.title}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={emailId}>Email</label>
            <input
              type="text"
              id={emailId}
              {...register('email')}
              placeholder="Enter your email"
              className={errors.email ? s.inputError : ''}
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
                placeholder="Enter your password"
                className={errors.password ? s.inputError : ''}
              />
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
              <button
                type="button"
                className={s.eyeIcon}
                onClick={togglePasswordVisibility}
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
            <label htmlFor={repeatPwdId}>Repeat Password</label>
            <div className={s.icon}>
              <input
                id={repeatPwdId}
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
                onClick={toggleRepeatPasswordVisibility}
              >
                {showRepeatPassword ? (
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
         <div className={s.buttonWrapper}>
          <button type="submit" className={s.button} disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
            <GoogleAuthButton text={'Sign up with Google'} />
          </div>
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
