import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/">
      <strong className={s.logo}>AQUATRACK</strong>
    </Link>
  );
};

export default Logo;