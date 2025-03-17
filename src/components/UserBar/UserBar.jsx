import { useState, useEffect, useRef } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectName, selectAvatar } from '../../redux/user/selectors'; //перевірити селектори
import sprite from '../../../public/sprite.svg';
import s from './UserBar.module.css';

const UserBar = ({ setLogoutModal, setSettingsModal }) => {
  
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const buttonRef = useRef(null)
  const popoverRef = useRef(null)
  

  const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  const nameUser = useSelector(selectName); //перевірити селектори
  const avatar = useSelector(selectAvatar); //перевірити селектори

 const togglePopover = (e) => {
    setPopoverOpen((prev) => !prev); 
  };

  const handleClickOutside = (event) => {
    if (
      popoverRef.current && 
      !popoverRef.current.contains(event.target) && 
      !buttonRef.current.contains(event.target)
    ) {
      setPopoverOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${s.wrapper} fourth-step`}>
      <button className={s.btn} onClick={togglePopover} ref={buttonRef}>
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
            href={isPopoverOpen ? `${sprite}#chevron-up` : `${sprite}#chevron-down`}
          ></use>
        </svg>
      </button>
      {isPopoverOpen && <UserBarPopover setLogoutModal={setLogoutModal} popoverRef={popoverRef} setSettingsModal={setSettingsModal} />}
    </div>
  );
};

export default UserBar;
