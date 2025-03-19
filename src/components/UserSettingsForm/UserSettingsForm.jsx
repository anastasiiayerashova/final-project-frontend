import React, { useState, useEffect } from 'react';
import s from './UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDailySportTime,
  selectDailyWaterNorm,
  selectEmail,
  selectGender,
  selectName,
  selectWeight,
  selectAvatar,
} from '../../redux/user/selectors';
import {
  updateUserAvatarOperation,
  updateUserOperation,
} from '../../redux/user/operations.js';
import { useTranslation } from 'react-i18next';
import { useUserValidationSchema } from '../../utils/hooks/useUserValidationSchema.js';
import { fetchWaterMonthly } from '../../redux/water/operations.js';
import { selectMonth } from '../../redux/water/selectors.js';

const UserSettingsForm = ({ onClose }) => {
  const svgIcon = '/sprite.svg';
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const avatar = useSelector(selectAvatar);
  const waterNorm = useSelector(selectDailyWaterNorm);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const gender = useSelector(selectGender);
  const activeTime = useSelector(selectDailySportTime);
  const weight = useSelector(selectWeight);

  const validationSchema = useUserValidationSchema(t);

  const monthRedux = useSelector(selectMonth);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',

    defaultValues: {
      gender,
      name,
      email,
      weight,
      activeTime,
      waterNorm: waterNorm ? waterNorm / 1000 : 0,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [calculatedWaterAmount, setCalculatedWaterAmount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const calculateWaterNorm = (weight, time, gender) => {
    if (gender === 'woman') {
      return (weight * 0.03 + time * 0.4).toFixed(2);
    } else if (gender === 'man') {
      return (weight * 0.04 + time * 0.6).toFixed(2);
    }
    return null;
  };

  const watchedWeight = watch('weight');
  const watchedSportTime = watch('activeTime');
  const watchedGender = watch('gender');

  useEffect(() => {
    if (watchedSportTime) {
      trigger('activeTime');
    }
  }, [watchedSportTime, trigger]);

  useEffect(() => {
    const waterNorm = calculateWaterNorm(
      Number(watchedWeight) || 0,
      Number(watchedSportTime) || 0,
      watchedGender,
    );

    if (!isNaN(waterNorm)) {
      setCalculatedWaterAmount(waterNorm);
    }
  }, [watchedWeight, watchedSportTime, watchedGender]);

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      formData.append('photo', file);
      console.log([...formData.entries()]);
      dispatch(updateUserAvatarOperation(formData));
      clearErrors('avatar');
      trigger('avatar');
    }
  };

  const onSubmit = async (values) => {
    setIsDisabled(true);
    try {
      await dispatch(
        updateUserOperation({
          email: values.email,
          name: values.name,
          gender: values.gender,
          weight: values.weight,
          dailySportTime: values.activeTime,
          dailyWaterNorm: values.waterNorm * 1000,
        }),
      ).unwrap();

      toast.success(t('notifications.data_updated'), {
        style: {
          backgroundColor: 'white',
          color: 'green',
        },
      });

      onClose(); // Закриваємо лише після успішного запиту
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
      let errorMessage = t('errors.try_again');

      toast.error(errorMessage, {
        style: {
          backgroundColor: 'white',
          color: 'red',
        },
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
    toast.error(t('errors.try_again'), {
      style: {
        backgroundColor: 'white',
        color: 'red',
      },
    });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className={s.title}>{t('common.settings')}</h2>

      {/* Аватар */}
      <div className={s.avatarContainer}>
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className={s.avatarImage}
          />
        ) : (
          <div className={s.avatarPlaceholder}>{t('settingModal.no_img')}</div>
        )}
        <div className={s.labelWrapper}>
          <svg className={s.icon}>
            <use href={`${svgIcon}#upload`} />
          </svg>
          <label htmlFor="avatar" className={s.uploadLabel}>
            {t('settingModal.upload_img')}
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            {...register('avatar')}
            onChange={(e) => {
              register('avatar').onChange(e);
              handleChangeAvatar(e);
            }}
            className={s.hiddenInput}
          />
          {errors.avatar && (
            <p className={s.errorText}>{errors.avatar.message}</p>
          )}
        </div>
      </div>
      <div className={s.main_wrap}>
        <div className={s.first_wrap}>
          {/* Гендер */}
          <div className={s.formGroup}>
            <p className={s.bold_text}>{t('settingModal.gender_identity')}</p>
            <div className={s.genderWrapper}>
              <label className={s.radioLabel} htmlFor="woman">
                <input
                  id="woman"
                  type="radio"
                  value="woman"
                  {...register('gender')}
                />
                {t('settingModal.woman')}
              </label>
              <label className={s.radioLabel} htmlFor="man">
                <input
                  type="radio"
                  id="man"
                  value="man"
                  {...register('gender')}
                />
                {t('settingModal.man')}
              </label>
            </div>
            {errors.gender && (
              <p className={s.errorText}>{errors.gender.message}</p>
            )}
          </div>

          {/* Імʼя */}
          <div className={s.formGroup}>
            <label htmlFor="name" className={s.label_bold_text}>
              {t('settingModal.your_name')}
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              onBlur={() => trigger('name')}
              className={s.input}
            />
            {errors.name && (
              <p className={s.errorText}>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className={s.formGroup}>
            <label htmlFor="email" className={s.label_bold_text}>
              {t('common.email_label')}
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              onBlur={() => trigger('name')}
              className={s.input}
            />
            {errors.email && (
              <p className={s.errorText}>{errors.email.message}</p>
            )}
          </div>

          {/* Денна норма */}

          <label htmlFor="waterNorm" className={s.bold_text}>
            {t('trackerPage.daily_norm')}
          </label>

          {/* Формула */}
          <div className={s.formula_wrap}>
            <div className={s.formula_info_wrapper}>
              <div className={s.formulaInfo}>
                <p>{t('settingModal.for_woman')}:</p>
                <span>V=(M*0,03) + (T*0,4)</span>
              </div>
              <div className={s.formulaInfo}>
                <p>{t('settingModal.for_man')}:</p>
                <span>V=(M*0,04) + (T*0,6)</span>
              </div>
            </div>
            <div></div>
            <p className={s.hint}>
              <span>* </span>
              {t('settingModal.v_m_t_description')}
            </p>
          </div>

          {/* Час активності */}
          <div className={s.formActive}>
            <svg className={s.exclamIcon}>
              <use href={`${svgIcon}#icon-alert`} />
            </svg>
            <p className={s.label_simple}>{t('settingModal.active_time')}</p>
          </div>
        </div>
        <div className={s.second_wrap}>
          {/* Вага */}
          <div className={s.formGroup_2}>
            <label htmlFor="weight" className={s.label_simple}>
              {t('settingModal.weight')}:
            </label>
            <input
              id="weight"
              type="text"
              {...register('weight', {
                valueAsNumber: true,
                min: 1,
                required: true,
              })}
              onBlur={() => trigger('weight')}
              step="0.01"
              className={s.input}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
            />
            {errors.weight && (
              <p className={s.errorText}>{errors.weight.message}</p>
            )}
          </div>

          <div className={s.formGroup_2}>
            <label htmlFor="sport" className={s.label_simple}>
              {t('settingModal.sport_time')}:
            </label>
            <input
              id="sport"
              type="number"
              {...register('activeTime', {
                valueAsNumber: true,
                min: 0,
                required: true,
              })}
              className={s.input}
              onBlur={() => trigger('activeTime')}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
            />
            {errors.activeTime && (
              <p className={s.errorText}>{errors.activeTime.message}</p>
            )}
          </div>
          <div className={s.recommend_wrap}>
            <p>{t('settingModal.recommend_water_intake')}:</p>
            <span>
              {calculatedWaterAmount ? `${calculatedWaterAmount} L` : '1.5 L'}
            </span>
          </div>
          {/* Скільки планує пити */}
          <div className={s.formGroup_3}>
            <label htmlFor="dailyWater">
              {t('settingModal.how_much_will_drink')}:
            </label>
            <input
              id="dailyWater"
              type="text"
              step="0.01"
              {...register('waterNorm', {
                min: 0.5,
                required: true,
              })}
              onBlur={() => trigger('waterNorm')}
              className={s.input}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
              value={watch('waterNorm') ? watch('waterNorm') : ''}
            />
            {errors.waterNorm && (
              <p className={s.errorText}>{errors.waterNorm.message}</p>
            )}
          </div>

          {/* Рекомендація */}
        </div>
      </div>
      {/* Кнопка сабміту */}
      <button type="submit" className={s.saveButton} disabled={isDisabled}>
        {isDisabled ? t('common.saving') : t('common.save')}
      </button>
    </form>
  );
};

export default UserSettingsForm;
