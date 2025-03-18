import { useDispatch } from 'react-redux';
import s from './LogOutModal.module.css';
import { MODAL_NAME } from '../../constants/index.js';
import { logoutUserOperation } from '../../redux/user/operations.js';
import { useTranslation } from 'react-i18next';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();

  const handleCloseModal = () => onClose(MODAL_NAME.LOGOUT_MODAL);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logoutUserOperation());
  };

  return (
    <div className={s.delete_wrapper}>
      <div className={s.delete_desc}>
        <h3>{t('common.log_out')}</h3>
        <p>{t('notifications.want_leave')}</p>
      </div>
      <div className={s.delete_btns}>
        <button className={`${s.button} ${s.delete_btn}`} onClick={handleLogout}>{t('common.log_out')}</button>
        <button className={`${s.button} ${s.cancelBtn}`} onClick={handleCloseModal}>{t('common.cancel')}</button>
      </div>
    </div>
  );
};

export default LogOutModal;