import React, { useState, useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './SignUpForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { registerUserOperation } from '../../redux/user/operations.js';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton.jsx';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useValidationSchema } from '../../utils/hooks/useValidationSchema.js';
import { useTranslation } from 'react-i18next';
import { useLastFocusedField } from '../../utils/hooks/useLastFocusedField.js';
import { formattedErrorKey } from '../../i18n/utils/formattedErrorKey.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const schema = useValidationSchema('includeRepeatPassword',); /*Кастомний хук для створення схеми валідації*/
  const { restoreFocus } = useLastFocusedField(); /*Кастомний хук для повернення фокусу в останній активний інпут*/

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailId = useId();
  const pwdId = useId();
  const repeatPwdId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    values: { email: '', password: '', repeatPassword: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    dispatch(
      registerUserOperation({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', res.token);
        toast.success(t('notifications.welcome', { email: values.email }), {
          style: {
            backgroundColor: 'white',
            color: 'green',
          },
        });
        setIsSubmitting(false);
        reset();
        navigate('/tracker');
      })
      .catch((e) => {

        let errorMessage = t(`errors.${formattedErrorKey(e)}`) || t('errors.try_again');

        setIsSubmitting(false);
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
  const repeatPwdValue = watch('repeatPassword');

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
  /*Ефект нижче - для зміни мови валідації й повернення фокусу в останній активний інпут, після перемикання мови*/
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
        <h2 className={s.title}>{t('common.sign_up')}</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
          <div className={s.inputGroup}>
            <label htmlFor={emailId}>{t('common.email_label')}</label>
            <input
              type="text"
              id={emailId}
              {...register('email')}
              placeholder={t('notifications.enter_email')}
              className={errors.email ? s.inputError : ''}
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
                className={errors.password ? s.inputError : ''}
              />
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
              <button type="button" className={s.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg width="20" height="20">
                    <use href="/sprite.svg#eye" />
                  </svg>
                ) : (
                  <svg width="20" height="20">
                    <use href="/sprite.svg#eye-off" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={s.inputGroup}>
            <label htmlFor={repeatPwdId}>{t('common.repeat_password_label')}</label>
            <div className={s.icon}>
              <input
                id={repeatPwdId}
                type={showRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                placeholder={t('notifications.repeat_password')}
                className={errors.repeatPassword ? s.inputError : ''}
              />
              {errors.repeatPassword && (
                <p className={s.error}>{errors.repeatPassword.message}</p>
              )}

              <button type="button" className={s.eyeIcon} onClick={toggleRepeatPasswordVisibility}>
                {showRepeatPassword ? (
                  <svg width="20" height="20">
                    <use href="/sprite.svg#eye" />
                  </svg>
                ) : (
                  <svg width="20" height="20">
                    <use href="/sprite.svg#eye-off" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <button type="submit" className={s.button} disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : t('common.sign_up')}
            </button>
            <GoogleAuthButton text={t('common.sign_up_google')} />
          </div>
        </form>

        <div className={s.wrapperUp}>
          <span className={s.account}>
            {t('signUpForm.with_account')}&nbsp;
          </span>
          <a href="/signin" className={s.signup}>{t('common.sign_in')}</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
