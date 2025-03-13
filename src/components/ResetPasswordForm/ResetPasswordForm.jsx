import React, { useState, useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './ResetPasswordForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { api } from '../../utils/axios.config.js';
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
});

const ResetPasswordForm = ({onEmailSent}) => {  // отправляем email
  
  const emailId = useId();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.post('/auth/request-reset-email', { email: values.email })

      if (!response) throw new Error('No response')

      toast.success('Email with password reset instructions sent!', {
        style: { backgroundColor: 'white', color: 'green' },
      })

      reset()
      onEmailSent()

    } catch (e) {
      console.log(e)
      toast.error('Please, try again later, something went wrong', {
        style: {
          backgroundColor: 'white',
          color: 'red',
        },
      });
    }
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
    
    useEffect(() => {
      if (emailValue) {
          trigger('email'); 
          }
    }, [emailValue, trigger]);

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
        <LanguageButtons/>
      </div>
      <div className={s.menu_container}>
        <h2 className={s.title}>Reset your password</h2>
         <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
           <div className={s.inputGroup}>
             <label htmlFor={emailId}>Email</label>
             <input
              id={emailId}
              type="text"
              {...register('email')}
              placeholder="Enter your email"
              className={errors.email ? `${s.inputError}` : ''}
             />
             {errors.email && <p className={s.error}>{errors.email.message}</p>}
            </div>
            <button type="submit" className={s.button}>Send email</button>
          </form>
          <div className={s.helpersWrapper}>
           <div className={s.wrapperUp}>
            <button className={s.button}><a href="/" className={s.signup}>Go Home</a></button>
           </div>
          </div>
        </div>
    </div>
  );
};

export default ResetPasswordForm;
