import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import s from './UserSettingsModal.module.css';

// Встановлюємо root-елемент для модального вікна (зазвичай це #root)
Modal.setAppElement('#root');

const UserSettingsModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    image: null,
    gender: null,
    name: '',
    email: '',
    weight: 0,
    active: 0,
    water: 0,
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'weight' || 'active' || 'water' ? value : value.trim(),
    }));
  };

  //Розрахунок норми споживання води
  const calculateWaterIntake = () => {
    const { gender, weight, active } = formData;
    const weightNum = parseFloat(weight) || 0;
    const activeNum = parseFloat(active) || 0;

    if (gender === 'women') {
      return (weightNum * 0.03 + activeNum * 0.4).toFixed(2);
    } else if (gender === 'man') {
      return (weightNum * 0.04 + activeNum * 0.6).toFixed(2);
    }
    return '0.00';
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
            <div className={classNames(s.inputGroup, s.fontThree)}>
              <label htmlFor="gender" className={s.fontThree}>
                Your gender identit
              </label>
              <div className={classNames(s.fontFour, s.gender)}>
                <input
                  type="radio"
                  id="women"
                  name="gender"
                  value="women"
                  checked={formData.gender === 'women'}
                  onChange={handleChange}
                  className={s.customRadio}
                />
                <label htmlFor="women" className={s.customRadioLabel}>
                  Woman
                </label>

                <input
                  type="radio"
                  id="man"
                  name="gender"
                  value="man"
                  checked={formData.gender === 'man'}
                  onChange={handleChange}
                  className={s.customRadio}
                />
                <label htmlFor="man" className={s.customRadioLabel}>
                  Man
                </label>
              </div>
            </div>
            <div className={classNames(s.inputGroup, s.fontThree)}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className={classNames(s.inputGroup, s.fontThree)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {formData.error && <p className={s.error}>{formData.error}</p>}
            </div>
            <h3 className={classNames(s.fontHThree, s.fontThree)}>
              My daily norma
            </h3>
            <p className={classNames(s.fontFour, s.textNorma)}>For woman:</p>
            <p className={classNames(s.normaWoman, s.textWM)}>
              V=(M*0.03) + (T*0.4)
            </p>
            <p className={classNames(s.fontFour, s.textNorma)}>For man:</p>
            <p className={classNames(s.normaMan, s.textWM)}>
              V=(M*0.04) + (T*0.6)
            </p>
            <div className={s.instruction}>
              <span className={s.span}>*</span>
              <p className={classNames(s.fontFour)}>
                V is the volume of the water norm in liters per day, M is your
                body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
            </div>
            <div>
              <div className={s.infoAktiv}>
                <svg width="14" height="18">
                  <use href="/sprite.svg#icon-alert"></use>
                </svg>
                <p className={classNames(s.fontFour)}>Active time in hours</p>
              </div>
              <div className={classNames(s.inputWeightActive)}>
                <label htmlFor="weight" className={classNames(s.fontFour)}>
                  Your weight in kilograms:
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className={classNames(s.inputWeightActive, s.fontFour)}>
                <label htmlFor="active" className={classNames(s.fontFour)}>
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  id="active"
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                  placeholder="0"
                  className={s.blockWeightActive}
                />
              </div>
            </div>
            <div className={s.divCalculate}>
              <p className={classNames(s.fontFour, s.Required)}>
                The required amount of water in liters per day:
              </p>
              <p className={s.calculate}>{calculateWaterIntake()} L</p>
            </div>
            <div className={classNames(s.inputWeightActive, s.fontThree)}>
              <label htmlFor="water">
                Write down how much water you will drink:
              </label>
              <input
                type="number"
                id="water"
                name="water"
                value={formData.water}
                onChange={handleChange}
                placeholder="0"
                className={classNames(s.fontFour)}
              />
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
          Save
        </button>
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
