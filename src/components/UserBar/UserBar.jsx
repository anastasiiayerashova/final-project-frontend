import { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectName,
  selectAvatar,
} from '../../redux/user/selectors'; //перевірити селектори
import sprite from '../../../public/sprite.svg';
import s from './UserBar.module.css';

const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  const nameUser = useSelector(selectName); //перевірити селектори
  const avatar = useSelector(selectAvatar); //перевірити селектори

  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={() => setIsOpen((prev) => !prev)}>
        <p className={s.nameUser}>{isLoggedIn ? nameUser : 'User'}</p>
        {!isLoggedIn ? (
          <picture>
            <source
              srcSet="/btn_images/avatar_btn_hello_mob-min.png, /btn_images/avatar_btn_hello_mob@2x-min.png"
              media="(max-width: 767px)"
              type="image/png"
            />
            <source
              srcSet="/btn_images/avatar_btn_hello_tab_desk-min.png, /btn_images/avatar_btn_hello_tab_desk@2x-min.png"
              media="(min-width: 768px) and (max-width: 1279px)"
              type="image/png"
            />
            <img
              src="/btn_images/avatar_btn_hello_mob-min.png"
              alt="avatar"
              className={s.avatar}
            />
          </picture>
        ) : (
          <img src={avatar} alt="avatar" className={s.avatar} />
        )}
        <svg className={s.icon}>
          <use
            href={isOpen ? `${sprite}#chevron-up` : `${sprite}#chevron-down`}
          ></use>
        </svg>
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
