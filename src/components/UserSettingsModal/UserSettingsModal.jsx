import React from 'react';
import s from './UserSettingsModal.module.css';

const UserSettingsModal = ({ closeModal }) => {
  return (
    <div className={s.backdrop} onClick={closeModal}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={closeModal}>
          <svg className={s.closeBtn} width="24" height="24">
            <use href="/sprite.svg#x"></use>
          </svg>
        </button>
        <div className={s.headerBlock}>
          <h2 className={s.setting}>Setting</h2>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
