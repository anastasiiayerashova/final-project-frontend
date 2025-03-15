import UserBar from '../UserBar/UserBar';
import s from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectName } from '../../redux/user/selectors'; //перевірити селектори
import { useTranslation } from 'react-i18next';

const UserPanel = ({ setLogoutModal, setSettingsModal }) => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectIsLoggedIn); //перевірити селектори
  const nameUser = useSelector(selectName); //перевірити селектори

  return (
    <div className={s.userPanel}>
      <h2 className={s.greetings}>
        <span>{t('notifications.hello')}</span>
        <span className={s.bold_span}>{t('notifications.user_name', { user: !isLoggedIn ? 'USER' : nameUser })}</span>
      </h2>
      <UserBar
        setLogoutModal={setLogoutModal}
        setSettingsModal={setSettingsModal}
      />
    </div>
  );
};

export default UserPanel;
