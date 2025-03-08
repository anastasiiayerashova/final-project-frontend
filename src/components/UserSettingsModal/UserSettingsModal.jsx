import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import s from './UserSettingsModal.module.css';

// Встановлюємо root-елемент для модального вікна (зазвичай це #root)
Modal.setAppElement('#root');

const UserSettingsModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    image: null,
    gender: null,
    name: '',
    email: '',
    weight: '',
    active: '',
    water: '',
    error: '',
  });

  // Завантаження фото
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormData((prev) => ({
        ...prev,
        error: 'Файл повинен бути зображенням!',
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFormData((prev) => ({
        ...prev,
        error: 'Файл занадто великий! (макс. 2MB)',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      error: '',
      image: URL.createObjectURL(file),
    }));
  };

  // Валідація email
  const handleEmailChange = (event) => {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    setFormData((prev) => ({
      ...prev,
      email: value,
      error: emailRegex.test(value) ? '' : 'Неправильний формат email',
    }));
  };

  // Обробка збереження
  const handleSave = () => {
    if (formData.error) return;
    console.log('Збережені дані:', formData);
    alert('Дані збережено!');
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.modalContent}>
        <button type="button" onClick={closeModal} className={s.closeBtn}>
          <svg width="24" height="24">
            <use href="/sprite.svg#x"></use>
          </svg>
        </button>
        <h2 className={s.setting}>Setting</h2>
        {/* Блок фото */}
        <div className={s.blockPhoto}>
          <label htmlFor="fileInput">
            <img
              src={formData.image || '/btn_images/avatar_btn_hello_mob-min.png'} // Зображення за замовчуванням
              alt="Avatar"
              width="75px"
              height="75px"
              className={s.avatar}
            />
          </label>
          <label htmlFor="fileInput" className={s.settingPhotoUpload}>
            <svg width="18" height="18">
              <use href="/sprite.svg#upload" className="reviews-btn-svg"></use>
            </svg>
            <p className={s.textUpload}>Upload a photo</p>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
            className={s.hiddenInput} // Додаємо клас, щоб сховати реальний input
          />
        </div>

        <div className={s.blockPhoto}>
          <form>
            {/* Поля введення */}
            <div className={s.inputGroup}>
              <label>Стать</label>
              <div className={s.genderGroup}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="women"
                    checked={formData.gender === 'women'}
                    onChange={handleChange}
                  />
                  Жінка
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="man"
                    checked={formData.gender === 'man'}
                    onChange={handleChange}
                  />
                  Чоловік
                </label>
              </div>
            </div>
            <div className={s.inputGroup}>
              <label>Ім'я</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className={s.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {formData.error && <p className={s.error}>{formData.error}</p>}
            </div>

            {/* Інші поля */}
          </form>
        </div>
        {/* Кнопка збереження */}
        <button
          onClick={handleSave}
          className={s.saveButton}
          disabled={!!formData.error}
        >
          Зберегти зміни
        </button>
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
