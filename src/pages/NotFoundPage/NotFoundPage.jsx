import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import s from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={s.container}>
      <Logo />
      <div className={s.container_text}>
        <h1 className={s.text_number}>404</h1>
        <h2 className={s.text_title_err}>Page Not Found</h2>
        <p className={s.text_message}>
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link to="/" className={s.link_home}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
