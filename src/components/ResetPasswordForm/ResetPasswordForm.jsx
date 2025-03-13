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
    .required('Email is required'),
});

const ResetPasswordForm = () => {
  // отправляем email

  const [isEmailSent, setIsEmailSent] = useState(false); // показываем модалку после успешной отправки email
  const emailId = useId();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  //   const resetPasswordEmailTemplate = (resetLink) => `
  // <!DOCTYPE html>
  // <html lang="en">
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>Password Reset</title>
  // </head>
  // <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  //     <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
  //         <h2 style="color: #333333; text-align: center;">Password Reset Request</h2>
  //         <p style="font-size: 16px; color: #555555;">Hello,</p>
  //         <p style="font-size: 16px; color: #555555;">
  //             You requested to reset your password. Click the button below to proceed:
  //         </p>

  //         <div style="text-align: center; margin: 20px 0;">
  //             <a href="${resetLink}"
  //                style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
  //                 Reset Password
  //             </a>
  //         </div>

  //         <p style="font-size: 14px; color: #999999; text-align: center;">
  //             If you didn’t request this, you can ignore this email.
  //         </p>

  //         <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">

  //         <p style="font-size: 12px; color: #aaaaaa; text-align: center;">
  //             This email was sent automatically. Please do not reply.
  //         </p>
  //     </div>
  // </body>
  // </html>
  // `;

  const onSubmit = async (values) => {
    try {
      const response = await api.post('/auth/request-reset-email', {
        email: values.email,
      });

      // Формуємо посилання для скидання пароля

      const resetLink = `http://localhost:5173/change-pwd?token=${response.data.token}`;

      // Показуємо тост із повідомленням
      toast.success('Email with password reset instructions sent!', {
        style: { backgroundColor: 'white', color: 'green' },
      });

      // Виводимо HTML листа у консоль для перевірки (реально це робить сервер)
      console.log(resetPasswordEmailTemplate(resetLink));

      reset();
      setIsEmailSent(true);
    } catch (e) {
      toast.error('Please, try again', {
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
