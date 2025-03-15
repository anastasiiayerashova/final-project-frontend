import s from './ResetPasswordModal.module.css'
import { useTranslation } from 'react-i18next';

const ResetPasswordModal = () => {
    const { t } = useTranslation();
    
      return (
           <div className={s.delete_wrapper}>
              <div className={s.delete_desc}>
                 <h3>{t('notifications.email_sent')}</h3>
                 <p>{t('notifications.check_email')}</p>
              </div>
              <div className={s.delete_btns}>
                 <button className={`${s.button} ${s.delete_btn}`}><a href="/" className={s.signup}>{t('common.go_home')}</a></button>
              </div>
           </div>
  );
};

export default ResetPasswordModal