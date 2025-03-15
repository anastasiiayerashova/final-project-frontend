import { useMemo } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getLocalizedMessage } from '../../i18n/utils/getValidationMessage';

export const useUserValidationSchema = (t) => {
  return Yup.object().shape({
    avatar: Yup.mixed(),
    gender: Yup.string().required(t('validation.gender')),
    name: Yup.string()
      .required(t('validation.name_required'))
      .matches(/^[а-яА-ЯёЁЇїІіЄєҐґa-zA-Z\s]+$/, t('validation.name_contain')),
    email: Yup.string()
      .email(t('validation.invalid_email'))
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i,
        t('validation.valid_email'),
      )
      .min(3, t('validation.password_min'))
      .max(50, t('validation.password_max'))
      .required(t('validation.email_required')),
    weight: Yup.number()
      .typeError(getLocalizedMessage(t, 'number', 'weight'))
      .positive(getLocalizedMessage(t, 'positive', 'weight'))
      .min(1, getLocalizedMessage(t, 'min', 'weight', { min: 1 }))
      .max(500, getLocalizedMessage(t, 'max', 'weight', { min: 500 }))
      .required(getLocalizedMessage(t, 'required', 'weight')),
    activeTime: Yup.number()
      .typeError(getLocalizedMessage(t, 'number', 'activeTime'))
      .positive(getLocalizedMessage(t, 'positive', 'activeTime'))
      .min(0, getLocalizedMessage(t, 'min', 'activeTime', { min: 0 }))
      .max(24, getLocalizedMessage(t, 'max', 'activeTime', { max: 24 }))
      .required(getLocalizedMessage(t, 'required', 'activeTime')),
    waterNorm: Yup.number()
      .typeError(getLocalizedMessage(t, 'number', 'waterNorm'))
      .min(0.5, 'Daily water norm must be at least 0.5 L')
      .max(15, 'Daily water norm cannot exceed 15 L')
      .required(getLocalizedMessage(t, 'required', 'waterNorm')),
  });
};