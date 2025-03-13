import React, { useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import s from './ChangePasswordForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { api } from '../../utils/axios.config.js';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(3, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(3, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ChangePasswordForm = () => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const pwdId = useId();
  const confirmPwdId = useId();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      console.log('Reset token:', token);

      const response = await api.post('/auth/reset-password', {
        token,
        password: values.password,
      });

      toast.success(response.data.message || 'Password changed successfully!', {
        style: { backgroundColor: 'white', color: 'green' },
      });

      reset();
      navigate('/signin');
    } catch (e) {
      toast.error(
        e.response?.data?.message || 'Failed to change password. Try again!',
        {
          style: { backgroundColor: 'white', color: 'red' },
        },
      );
    }
  };

  const pwdValue = watch('password');
  const confirmPwdValue = watch('confirmPassword');
  
    useEffect(() => {
      if (pwdValue) {
        trigger('password');
      }
    }, [pwdValue, trigger]);
  
    useEffect(() => {
      if (confirmPwdValue) {
        trigger('confirmPassword');
      }
    }, [confirmPwdValue, trigger]);

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>Change your password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={pwdId}>New password</label>
            <input
              id={pwdId}
              type="password"
              {...register('password')}
              placeholder="Enter new password"
              className={errors.password ? s.inputError : ''}
            />
            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={confirmPwdId}>Repeat password</label>
            <input
              id={confirmPwdId}
              type="password"
              {...register('confirmPassword')}
              placeholder="Repeat new password"
              className={errors.confirmPassword ? s.inputError : ''}
            />
            {errors.confirmPassword && (
              <p className={s.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className={s.button}>
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
