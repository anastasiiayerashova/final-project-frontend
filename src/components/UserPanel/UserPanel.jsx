import UserBar from '../UserBar/UserBar';
import s from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectName } from '../../redux/user/selectors'; //перевірити селектори

const UserPanel = ({setLogoutModal, setSettingsModal}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  const nameUser = useSelector(selectName); //перевірити селектори

  return (
    <div className={s.userPanel}>
      <h2 className={s.greetings}>
        Hello,{' '}
        <span className={s.user}>{!isLoggedIn ? 'USER' : nameUser}!</span>
      </h2>
      <UserBar setLogoutModal={setLogoutModal} setSettingsModal={setSettingsModal} />
    </div>
  );
};

export default UserPanel;
