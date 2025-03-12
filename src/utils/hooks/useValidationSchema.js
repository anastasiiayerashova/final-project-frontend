import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useValidationSchema = (repeatPassword = false) => {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => {
    let shape = {
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

      password: yup
        .string()
        .min(3, t('validation.password_min'))
        .max(50, t('validation.password_max'))
        .required(t('validation.password_required')),
    };

    if (repeatPassword) {
      shape.repeatPassword = yup
        .string()
        .min(3, t('validation.password_min'))
        .max(50, t('validation.password_max'))
        .oneOf([yup.ref('password'), null], t('validation.password_match'))
        .required(t('validation.password_required'));
    }

    return yup.object().shape(shape);
  }, [t, i18n.language, repeatPassword]);

  return schema;
};
