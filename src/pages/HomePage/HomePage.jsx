import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import s from './HomePage.module.css'

function HomePage() {
  return (
    <section className={s.main}>
      <WelcomeSection />
      <AdvantagesSection />
    </section>
  );
}

export default HomePage;
