import Logo from '../Logo/Logo.jsx';
import { NavLink } from 'react-router-dom';
import s from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={s.container}>
      <Logo />
      <div className={s.container_without_logo}>
        <div>
          <h2>Record daily water intake and track</h2>
          <h1>Water consumption tracker</h1>
        </div>
        <div className={s.container_link}>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Try tracker
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
