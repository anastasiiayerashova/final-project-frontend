import React, { useId, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import s from './ChangePasswordForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { api } from '../../utils/axios.config.js';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';
import { useValidationSchema } from '../../utils/hooks/useValidationSchema.js';
import { useLastFocusedField } from '../../utils/hooks/useLastFocusedField.js';

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const { restoreFocus } = useLastFocusedField();
  const schema = useValidationSchema(true, false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const pwdId = useId();
  const confirmPwdId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
  setShowRepeatPassword(!showRepeatPassword);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: '', repeatPassword: '' },
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

      toast.success(response.data.message || t('notifications.changed_password'), {
        style: { backgroundColor: 'white', color: 'green' },
      });

      reset();
      navigate('/signin');
    } catch (e) {
      toast.error(
        t(`errors.${formattedErrorKey(e.response?.data?.message)}`) || t('errors.failed_change_pwd'),
        {
          style: { backgroundColor: 'white', color: 'red' },
        },
      );
    }
  };

  const pwdValue = watch('password');
  const confirmPwdValue = watch('repeatPassword');
  
    useEffect(() => {
      if (pwdValue) {
        trigger('password');
      }
    }, [pwdValue, trigger]);
  
    useEffect(() => {
      if (confirmPwdValue) {
        trigger('repeatPassword');
      }
    }, [confirmPwdValue, trigger]);
  
  useEffect(() => {
    reset(getValues(), {
      keepValues: true,
      keepDirty: true,
    });
    restoreFocus();
  }, [schema, reset, getValues]);

  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>{t('changePasswordPage.change_pwd')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={pwdId}>{t('changePasswordPage.new_password')}</label>
            <input
              id={pwdId}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder={t('changePasswordPage.enter_new_pwd')}
              className={errors.password ? s.inputError : ''}
            />
            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
            <button
                            className={s.eyeIcon}
                            onClick={togglePasswordVisibility}
                            type="button"
                          >
                            {showPassword ? (
                              <svg width="20" height="20">
                                <use href="/sprite.svg#eye-off" />
                              </svg>
                            ) : (
                              <svg width="20" height="20">
                                <use href="/sprite.svg#eye" />
                              </svg>
                            )}
                          </button>
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={confirmPwdId}>{t('common.repeat_password_label')}</label>
            <input
              id={confirmPwdId}
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('repeatPassword')}
              placeholder={t('changePasswordPage.repeat_new_pwd')}
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
                                <use href="../../../public/sprite.svg#eye-off" />
                              </svg>
                            ) : (
                              <svg width="20" height="20">
                                <use href="../../../public/sprite.svg#eye" />
                              </svg>
                            )}
                          </button>
          </div>

          <button type="submit" className={s.button}>
            {t('common.change_pwd')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
