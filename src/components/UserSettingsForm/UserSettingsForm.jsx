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

      {/* Гендер */}
      <div className={s.formGroup}>
        <label className={s.label}>Your gender identity</label>
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
        <label htmlFor="name" className={s.label}>
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
        <label htmlFor="email" className={s.label}>
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
        <label htmlFor="waterNorm" className={s.label}>
          My daily norma (L)
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
      <div className={s.formulaInfo}>
        <p>
          For woman: V=(M*0.03)+(T*0.3)
          <br />
          For man: V=(M*0.04)+(T*0.6)
        </p>
        <p className={s.hint}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports.
        </p>
      </div>

      {/* Час активності */}
      <div className={s.formGroup}>
        <label htmlFor="activeTime" className={s.label}>
          Active time in hours
        </label>
        <input
          id="activeTime"
          type="number"
          {...register('activeTime')}
          className={s.input}
        />
        {errors.activeTime && (
          <p className={s.errorText}>{errors.activeTime.message}</p>
        )}
      </div>

      {/* Вага */}
      <div className={s.formGroup}>
        <label htmlFor="weight" className={s.label}>
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

      {/* Скільки планує пити */}
      <div className={s.formGroup}>
        <label htmlFor="dailyWater" className={s.label}>
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
      <div className={s.recommended}>
        Your recommended water intake per day: <strong>1.8 L</strong>
      </div>

      {/* Кнопка сабміту */}
      <button type="submit" className={s.saveButton}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
