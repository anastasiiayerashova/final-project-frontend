import Logo from '../Logo/Logo.jsx';
import { NavLink } from 'react-router-dom';
import s from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div>
      <Logo />
      <h2>Record daily water intake and track</h2>
      <h1>Water consumption tracker</h1>
      <div>
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
  );
};

export default WelcomeSection;
