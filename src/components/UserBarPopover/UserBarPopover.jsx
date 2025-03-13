import React from 'react';
import sprite from '../../../public/sprite.svg';
import Modal from 'react-modal';
import s from './UserBarPopover.module.css';

// Встановлюємо root-елемент для модального вікна (зазвичай це #root)
Modal.setAppElement('#root');

const UserBarPopover = ({ setLogoutModal, popoverRef, setSettingsModal }) => {

  return (
    <div className={s.barPopover} ref={popoverRef}>
      <button className={s.barBtn} onClick={setSettingsModal}>
        <svg width="16" height="16">
          <use
            href={`${sprite}#settings`}
            className={s.barPopoverIconSettings}
          ></use>
        </svg>
        <p className={s.setting}>Setting</p>
      </button>

      <button className={s.barBtn} onClick={setLogoutModal}>
        <svg width="16" height="16">
          <use
            href={`${sprite}#log-out`}
            className={s.barPopoverIconLogOut}
          ></use>
        </svg>
        <p className={s.logOut}>Log out</p>
      </button>
    </div>
  );
};

export default UserBarPopover;
