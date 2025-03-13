import React, { useId } from 'react';
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
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    try {
      console.log('Reset token:', token);

      const response = await api.post('/auth/reset-pwd', {
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

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>Change Your Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={pwdId}>New Password</label>
            <input
              id={pwdId}
              type="password"
              {...register('password')}
              onBlur={() => trigger('password')}
              placeholder="Enter new password"
              className={errors.password ? s.inputError : ''}
            />
            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={confirmPwdId}>Confirm Password</label>
            <input
              id={confirmPwdId}
              type="password"
              {...register('confirmPassword')}
              onBlur={() => trigger('confirmPassword')}
              placeholder="Confirm new password"
              className={errors.confirmPassword ? s.inputError : ''}
            />
            {errors.confirmPassword && (
              <p className={s.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className={s.button}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
