import { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import s from './UserBar.module.css';

const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={() => setIsOpen((prev) => !prev)}>
        <p>User</p>
        <img
          src="/btn_images/avatar_btn_hello_mob-min.png"
          alt="ellipse1"
          className={s.avatar}
        />
        <svg className={s.icon}>
          <use href="/sprite.svg#chevron-down"></use>
        </svg>
      </button>
      {isOpen && <UserBarPopover />};
    </div>
  );
};

export default UserBar;
