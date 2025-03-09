import UserBar from '../UserBar/UserBar';
import s from './UserPanel.module.css';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn, selectUser } from '../../redux/user/selectors'; //перевірити селектори

const UserPanel = () => {
  //   const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  //   const user = useSelector(selectUser); //перевірити селектори

  return (
    <div className={s.userPanel}>
      <h2 className={s.greetings}>
        Hellow, <span className={s.user}> USER {/*{user.email}*/} !</span>
      </h2>
      <UserBar />
      {/* {!isLoggedIn && <div>Hello, User</div>}
      {isLoggedIn && <div>Hello, {user.email}</div>} */}
    </div>
  );
};

export default UserPanel;
