import React, { useState, useId } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './ResetPasswordForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { api } from '../../utils/axios.config.js';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .min(3, 'Email must be at least 3 characters')
    .max(50, 'Email cannot exceed 50 characters')
    .required('Email is required')
});

const ResetPasswordForm = () => { // отправляем email

  const [isEmailSent, setIsEmailSent] = useState(false) // показываем модалку после успешной отправки email
  const emailId = useId()

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onBlur'
  });

    const onSubmit = async (values) => {

        try {
            const data = await api.post('/auth/request-reset-email', {
              email: values.email
            })
            console.log(data)

            toast.success(`${data.data.message}!`, {
                  style: {
                    backgroundColor: 'white',
                    color: 'green'
                  }
            })
            reset()
            setIsEmailSent(true)
        }

        catch (e) {
            toast.error('Please, try again', {
                  style: {
                     backgroundColor: 'white',
                     color: 'red',
                  },
                });
        }
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
        <h2 className={s.title}>Reset your password</h2>
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
          <button type="submit" className={s.button}>
            Send email
          </button>
        </form>
     <div className={s.helpersWrapper}>
        <div className={s.wrapperUp}>
          <p className={s.account}>Go &nbsp;</p>
          <a href="/" className={s.signup}>
            Home
          </a>
        </div>
       </div>
          </div>
    </div>
  );
};

export default ResetPasswordForm;