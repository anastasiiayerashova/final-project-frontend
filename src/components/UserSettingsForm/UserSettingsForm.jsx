// src/components/UserSettingsForm/UserSettingsForm.jsx
import React, { useState } from 'react';
import s from './UserSettingsForm.module.css';

// react-hook-form + Yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// redux
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/user/selectors'; // шлях до ваших селекторів

// axios
import { api, setAuthHeader } from '../../utils/axios.config'; // ваш файл із налаштованим axios

const UserSettingsForm = ({ initialData = {}, onClose }) => {
  // Локальний стан для попереднього перегляду аватарки
  const [avatarPreview, setAvatarPreview] = useState(
    initialData?.avatar || null,
  );

  const svgIcon = '/sprite.svg';

  // Токен із Redux (для авторизації)
  const token = useSelector(selectToken);

  // Схема валідації (Yup)
  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed(),
    gender: Yup.string().required('Please select your gender'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive('Weight must be greater than 0')
      .required('Weight is required'),
    activeTime: Yup.number()
      .typeError('Active time must be a number')
      .min(0, 'Active time cannot be negative')
      .required('Active time is required'),
    waterNorm: Yup.number()
      .typeError('Daily water norm must be a number')
      .min(0, 'Daily water norm cannot be negative')
      .required('Daily water norm is required'),
  });

  // Підключаємо форму
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // Заповнюємо форму з initialData (або пустими значеннями)
      gender: initialData.gender || 'female',
      name: initialData.name || 'Nadia',
      email: initialData.email || 'nadia10@gmail.com',
      weight: initialData.weight || '',
      activeTime: initialData.dailySportTime || '',
      waterNorm: initialData.dailyWaterNorm || '',
      
    },
  });

  // Зміна файлу аватарки
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Сабміт форми
  const onSubmit = async (data) => {
    // Якщо є токен — встановлюємо заголовок авторизації
    if (token) {
      setAuthHeader(token);
    }

    // Формуємо FormData
    const formData = new FormData();
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('dailySportTime', data.activeTime);
    formData.append('dailyWaterNorm', data.waterNorm);

    try {
      // Надсилаємо PUT/POST/PATCH (залежно від вашого бекенду)
      // Приклад: PUT на '/auth/user'
      const response = await api.put('/auth/user', formData);

      // Якщо успіх — можете закрити модалку чи показати повідомлення
      console.log('User updated:', response.data);
      alert('User data updated successfully!');
      if (onClose) onClose();
    } catch (error) {
      console.error('Update user error:', error);
      alert(error.response?.data?.message || 'Error updating user data');
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.title}>Setting</h2>

      {/* Аватар */}
      <div className={s.avatarContainer}>
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className={s.avatarImage}
          />
        ) : (
          <div className={s.avatarPlaceholder}>No image</div>
        )}
        <div className={s.labelWrapper}>
          <svg className={s.icon}>
              <use href={`${svgIcon}#upload`} />
          </svg>
        <label htmlFor="avatar" className={s.uploadLabel}>
          Upload a photo
        </label>
        <input
          type="file"
          id="avatar"
          {...register('avatar')}
          onChange={(e) => {
            handleAvatarChange(e);
            register('avatar').onChange(e);
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
        <p className={s.bold_text}>Your gender identity</p>
        <div className={s.genderWrapper}>
          <label className={s.radioLabel}>
            <input type="radio" value="female" {...register('gender')} />
            Woman
          </label>
          <label className={s.radioLabel}>
            <input type="radio" value="male" {...register('gender')} />
            Man
          </label>
        </div>
        {errors.gender && (
          <p className={s.errorText}>{errors.gender.message}</p>
        )}
      </div>

      {/* Імʼя */}
      <div className={s.formGroup}>
        <label htmlFor="name" className={s.label_bold_text}>
          Your name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={s.input}
        />
        {errors.name && <p className={s.errorText}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className={s.formGroup}>
        <label htmlFor="email" className={s.label_bold_text}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={s.input}
        />
        {errors.email && <p className={s.errorText}>{errors.email.message}</p>}
      </div>

      {/* Денна норма */}
      <div className={s.formGroup}>
        <label htmlFor="waterNorm" className={s.bold_text}>
          My daily norma
        </label>
        <input
          id="waterNorm"
          type="number"
          step="0.1"
          {...register('waterNorm')}
          className={s.input}
        />
        {errors.waterNorm && (
          <p className={s.errorText}>{errors.waterNorm.message}</p>
        )}
      </div>

          {/* Формула */}
          <div className={s.formula_wrap}>
      <div className={s.formulaInfo}>
            <p>For woman:</p>
            <span>V=(M*0,03) + (T*0,4)</span>
          </div>
          <div className={s.formulaInfo}>
            <p>For man:</p>
            <span>V=(M*0,04) + (T*0,6)</span>
          </div>
            <div>
              </div>
            <p className={s.hint}>
              <span>* </span>V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
        </p>
          </div>

      {/* Час активності */}
      <div className={s.formActive}>
        <svg className={s.exclamIcon}>
              <use href={`${svgIcon}#icon-alert`} />
          </svg>
        <p className={s.label_simple}>Active time in hours</p>
      </div>
      </div>
      <div className={s.second_wrap}>
      {/* Вага */}
      <div className={s.formGroup}>
        <label htmlFor="weight" className={s.label_simple}>
          Your weight in kilograms
        </label>
        <input
          id="weight"
          type="number"
          {...register('weight')}
          className={s.input}
        />
        {errors.weight && (
          <p className={s.errorText}>{errors.weight.message}</p>
        )}
          </div>
          
          <div className={s.formGroup}>
        <label htmlFor="sport" className={s.label_simple}>
          The time of active participation in sports:
        </label>
        <input
          id="sport"
          type="number"
        
          className={s.input}
        />
        {errors.weight && (
          <p className={s.errorText}>{errors.sport.message}</p>
        )}
          </div>
          <div className={s.recommend_wrap}>
            <p>Your recommended water intake per day:</p>
            <span>1.5 L</span>
            </div>
      {/* Скільки планує пити */}
      <div className={s.formGroup}>
        <label htmlFor="dailyWater" className={s.bold_text}>
          Write down how much water you will drink
        </label>
        <input
          id="dailyWater"
          type="number"
          step="0.1"
          {...register('waterNorm')}
          className={s.input}
        />
      </div>

      {/* Рекомендація */}
      
        </div>
        </div>
      {/* Кнопка сабміту */}
      <button type="submit" className={s.saveButton}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
