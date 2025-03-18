import React from 'react';
import sprite from '../../../public/sprite.svg';
import Modal from 'react-modal';
import s from './UserBarPopover.module.css';
import { useTranslation } from 'react-i18next';

// Встановлюємо root-елемент для модального вікна (зазвичай це #root)
Modal.setAppElement('#root');

const UserBarPopover = ({ setLogoutModal, popoverRef, setSettingsModal }) => {
  const { t } = useTranslation();
  return (
    <div className={s.barPopover} ref={popoverRef}>
      <button className={s.barBtn} onClick={setSettingsModal}>
        <svg width="16" height="16">
          <use
            href={`${sprite}#settings`}
            className={s.barPopoverIconSettings}
          ></use>
        </svg>
        <p className={s.setting}>{t('common.settings')}</p>
      </button>

      <button className={s.barBtn} onClick={setLogoutModal}>
        <svg className={s.barPopoverIconLogOut} width="16" height="16">
          <use href={`${sprite}#log-out`}></use>
        </svg>
        <p className={s.logOut}>{t('common.log_out')}</p>
      </button>
    </div>
  );
};

export default UserBarPopover;