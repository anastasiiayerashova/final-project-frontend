import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import s from './UserSettingsModal.module.css';

const UserSettingsModal = ({ onClose }) => {
  return (
    <div className={s.container}>
      <UserSettingsForm onClose={onClose} />
    </div>
  );
};

export default UserSettingsModal;
