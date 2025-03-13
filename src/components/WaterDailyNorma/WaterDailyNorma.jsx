import s from './WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <p className={s.normal}>1.5 L</p>
      <p className={s.text}>{t('trackerPage.daily_norm')}</p>
    </div>
  );
};

export default WaterDailyNorma;
