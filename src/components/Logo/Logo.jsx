import { Link } from 'react-router-dom';
import s from './Logo.module.css';
import GradientText from '../../animations/TextAnimations/GradientText/GradientText';
const Logo = () => {
  return (
    <Link to="/">
      <GradientText
        colors={[
          'var(--black)',
          'var(--green)',
          'var(--black)',
          'var(--green)',
          'var(--black)',
        ]}
        animationSpeed={7}
        showBorder={false}
        className={s.logo}
      >
        AQUATRACK
      </GradientText>
    </Link>
  );
};

export default Logo;
