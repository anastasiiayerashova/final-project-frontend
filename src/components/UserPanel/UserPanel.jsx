import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import s from './UserPanel.module.css';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn, selectUser } from '../../redux/user/selectors'; //перевірити селектори

// import AuthNav from '../AuthNav/AuthNav';
// import UserMenu from '../UserMenu/UserMenu';

const UserPanel = () => {
  //   const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  //   const user = useSelector(selectUser); //перевірити селектори

  return (
    <div className={s.userPanel}>
      <h2 className={s.greetings}>
        Hellow, <span className={s.user}> USER !</span>
      </h2>
      <UserBar />
      {/* {!isLoggedIn && <div>Hello, User</div>}
      {isLoggedIn && <div>Hello, {user.email}</div>}
      {!isLoggedIn && <AuthNav />}
      {isLoggedIn && <UserMenu />} */}
    </div>
  );
};

export default UserPanel;
