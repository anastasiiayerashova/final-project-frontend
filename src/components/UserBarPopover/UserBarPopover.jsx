import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import s from './UserBarPopover.module.css';
import { useState } from 'react';

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
        <svg className="comment-prev-btn" width="16" height="16">
          <use
            href="/sprite.svg#chevron-down"
            className="reviews-btn-svg"
          ></use>
        </svg>
        <p className={s.setting}>Setting</p>
      </button>
      {isSettingModalOpen && (
        <UserSettingsModal closeModal={closeSettingsModal} />
      )}
      <button className={s.barBtn} onClick={openLogOutModal}>
        <svg className="comment-prev-btn" width="16" height="16">
          <use
            href="/sprite.svg#chevron-down"
            className="reviews-btn-svg"
          ></use>
        </svg>
        <p className={s.logOut}>Log out</p>
      </button>
      {isLogOutModal && <LogOutModal closeModal={closeLogOutModal} />}
    </div>
  );
};

export default UserBarPopover;
