import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useEmailValidationSchema = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t('validation.invalid_email'))
          .matches(
            /^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i,
            t('validation.valid_email'),
          )
          .min(3, t('validation.email_min'))
          .max(50, t('validation.email_max'))
          .required(t('validation.email_required')),
      }),
    [t],
  );
};