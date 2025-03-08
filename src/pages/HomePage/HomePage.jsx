import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import s from './HomePage.module.css';

function HomePage() {
  return (
    <div className={s.wrapper}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}

export default HomePage;
