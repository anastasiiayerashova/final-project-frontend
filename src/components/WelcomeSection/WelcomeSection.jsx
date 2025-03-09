import Logo from '../Logo/Logo.jsx';
import { NavLink } from 'react-router-dom';
import s from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={s.container}>
      <div className={s.logo_container}>
        <Logo />
      </div>
      <div className={s.container_without_logo}>
        <div className={s.title_container}>
          <h2>Record daily water intake and track</h2>
          <h1>Water consumption tracker</h1>
        </div>
        <div className={s.container_link}>
          <NavLink
            to="/signup"
            className={s.link}
          >
            Try tracker
          </NavLink>
          <NavLink
            to="/signin"
            className={s.link_2}
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
