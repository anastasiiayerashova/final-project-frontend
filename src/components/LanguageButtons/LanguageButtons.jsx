import i18next from 'i18next';
import s from './LanguageButtons.module.css';
import { LOCALS } from '../../i18n/constants';

const LanguageButtons = () => {
  const onHandleChange = (lng) => i18next.changeLanguage(lng);
  return (
    <div className={s.language_buttons_wrapper}>
      <button
        disabled={i18next.language === LOCALS.UK}
        className={s.btn}
        onClick={() => {
          onHandleChange(LOCALS.UK);
        }}
      >
        UA
      </button>
      <button
        disabled={i18next.language === LOCALS.EN}
        className={s.btn}
        onClick={() => {
          onHandleChange(LOCALS.EN);
        }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageButtons;
