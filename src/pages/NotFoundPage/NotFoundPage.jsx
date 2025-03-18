import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import s from './NotFoundPage.module.css';
import { useTranslation } from 'react-i18next';
import LanguageButtons from '../../components/LanguageButtons/LanguageButtons';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
        <LanguageButtons />
      </div>
      <div className={s.container_text}>
        <h1 className={s.text_number}>404</h1>
        <h2 className={s.text_title_err}>{t('notFoundPage.not_found')}</h2>
        <p className={s.text_message}>{t('notFoundPage.sorry')}</p>

        <Link to="/" className={s.link_home}>
          {t('notFoundPage.go_home')}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;