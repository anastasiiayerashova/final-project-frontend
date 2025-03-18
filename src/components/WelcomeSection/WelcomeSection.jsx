import Logo from '../Logo/Logo.jsx';
import { NavLink } from 'react-router-dom';
import s from './WelcomeSection.module.css';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';

const WelcomeSection = () => {
  const { t } = useTranslation()
  
  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
        <LanguageButtons />
      </div>
      <div className={s.container_without_logo}>
        <div className={s.title_container}>
          <h2>{t('welcomeSection.second_title')}</h2>
          <h1>{t('welcomeSection.main_title')}</h1>
        </div>
        <div className={s.container_link}>
          <NavLink to="/signup" className={s.link}>
            {t('common.try_tracker')}
          </NavLink>
          <NavLink to="/signin" className={s.link_2}>
            {t('common.sign_in')}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
