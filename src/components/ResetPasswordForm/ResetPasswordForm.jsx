import React, { useId, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './ResetPasswordForm.module.css';
import Logo from '../Logo/Logo.jsx';
import { api } from '../../utils/axios.config.js';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';
import { useLastFocusedField } from '../../utils/hooks/useLastFocusedField.js';
import { useEmailValidationSchema } from '../../utils/hooks/useEmailValidationSchema.js';

const ResetPasswordForm = ({ onEmailSent }) => {
  const { t } = useTranslation();
  const schema = useEmailValidationSchema();
  const { restoreFocus } = useLastFocusedField();
  // отправляем email

  const emailId = useId();

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
    defaultValues: { email: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.post('/auth/request-reset-email', {
        email: values.email,
      });

      if (!response) throw new Error('No response');

      toast.success(t('notifications.email_sent'), {
        style: { backgroundColor: 'white', color: 'green' },
      });

      reset();
      onEmailSent();
    }
    catch (e) {
      console.log(e);
      
      let errorMessage

      if (e.response?.status === 404) {
          errorMessage = t("errors.User_not_found")
      }
      else {
          errorMessage = t(`errors.${formattedErrorKey(e)}`)
      }
      
      toast.error(errorMessage, {
        style: {
          backgroundColor: 'white',
          color: 'red',
        },
      });
    }
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

  useEffect(() => {
    if (emailValue) {
      trigger('email');
    }
  }, [emailValue, trigger]);

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
        <h2 className={s.title}>{t('signInForm.reset_password')}</h2>
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
          <button type="submit" className={s.button}>{t('common.send_email')}</button>
        </form>
        <div className={s.helpersWrapper}>
          <div className={s.wrapperUp}>
            <button className={s.button}>
              <a href="/" className={s.signup}>
                {t('common.go_home')}
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;