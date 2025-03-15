import React, { useState, useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './SignInForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { loginUserOperation } from '../../redux/user/operations.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton.jsx';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';
import { useValidationSchema } from '../../utils/hooks/useValidationSchema.js';
import { useLastFocusedField } from '../../utils/hooks/useLastFocusedField.js';
import { formattedErrorKey } from '../../i18n/utils/formattedErrorKey.js';

const SignInForm = () => {
  const { t } = useTranslation();
  const schema = useValidationSchema();
  const { restoreFocus } = useLastFocusedField();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailId = useId();
  const pwdId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    dispatch(
      loginUserOperation({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((res) => {
        toast.success(t('notifications.welcome', { email: values.email }), {
          style: {
            backgroundColor: 'white',
            color: 'green',
          },
        });
        reset();
        navigate('/tracker');
      })
      .catch((e) => {
        let errorMessage
        if (e.response?.status === 404) {
            errorMessage = t("errors.User_not_found")
        }
        else {
            errorMessage = t(`errors.${formattedErrorKey(e)}`);
        }
        
        toast.error(errorMessage, {
          style: {
            backgroundColor: 'white',
            color: 'red',
          },
        });
      });
  };

  const onError = (errors) => {
    toast.error(t('errors.try_again'), {
      style: {
        backgroundColor: 'white',
        color: 'red',
      },
    });
  };

  const emailValue = watch('email');
  const pwdValue = watch('password');

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
        <LanguageButtons />
      </div>

      <div className={s.menu_container}>
        <h2 className={s.title}>{t('common.sign_in')}</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={emailId}>{t('common.email_label')}</label>
            <input
              id={emailId}
              type="text"
              {...register('email')}
              placeholder={t('notifications.enter_email')}
              className={errors.email ? `${s.inputError}` : ''}
            />

            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={pwdId}>{t('common.password_label')}</label>
            <div className={s.icon}>
              <input
                id={pwdId}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder={t('notifications.enter_password')}
                className={errors.password ? `${s.inputError}` : ''}
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
          </div>
          <div className={s.buttonWrapper}>
            <button type="submit" className={s.button}>
              {t('common.sign_in')}
            </button>
            <GoogleAuthButton text={t('common.sign_in_google')} />
          </div>
        </form>
        <div className={s.helpersWrapper}>
          <div className={s.wrapperUp}>
            <p className={s.account}>{t('signInForm.without_account')}&nbsp;</p>
            <a href="/signup" className={s.signup}>
              {t('common.sign_up')}
            </a>
          </div>
          <div className={s.wrapperUp}>
            <p className={s.account}>{t('signInForm.help')}&nbsp;</p>
            <a href="/reset-pwd-email" className={s.signup}>
              {t('signInForm.reset_password')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
