import React from 'react';
import sprite from '../../../public/sprite.svg';
import Modal from 'react-modal';
// import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
// import LogOutModal from '../LogOutModal/LogOutModal';
import s from './UserBarPopover.module.css';
import { useState } from 'react';

// Встановлюємо root-елемент для модального вікна (зазвичай це #root)
Modal.setAppElement('#root');

const UserBarPopover = () => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogOutModal, setIsLogOutModal] = useState(false);

  const openSettingsModal = () => setIsSettingModalOpen(true);
  const closeSettingsModal = () => setIsSettingModalOpen(false);

  const openLogOutModal = () => setIsLogOutModal(true);
  const closeLogOutModal = () => setIsLogOutModal(false);

  return (
    <div className={s.barPopover}>
      <button className={s.barBtn} onClick={openSettingsModal}>
        <svg width="16" height="16">
          <use
            href={`${sprite}#settings`}
            className={s.barPopoverIconSettings}
          ></use>
        </svg>
        <p className={s.setting}>Setting</p>
      </button>

      {/* <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingsModal}
      /> */}

      <button className={s.barBtn} onClick={openLogOutModal}>
        <svg width="16" height="16">
          <use
            href={`${sprite}#log-out`}
            className={s.barPopoverIconLogOut}
          ></use>
        </svg>
        <p className={s.logOut}>Log out</p>
      </button>
      {/* <LogOutModal isOpen={isLogOutModal} closeModal={closeLogOutModal} /> */}
    </div>
  );
};

export default UserBarPopover;
