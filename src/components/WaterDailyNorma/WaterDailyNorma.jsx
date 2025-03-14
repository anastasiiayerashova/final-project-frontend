import { selectDailyWaterNorm } from '../../redux/user/selectors.js';
import s from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const dailyWaterNorm = useSelector(selectDailyWaterNorm);

  const dailyWaterNormInLiters = (dailyWaterNorm / 1000).toFixed(1);

  return (
    <div className={s.container}>
      <p className={s.normal}>
        {t('trackerPage.daily_norm_value', { dailyWaterNormInLiters })}
      </p>
      <p className={s.text}>{t('trackerPage.daily_norm')}</p>
    </div>
  );
};

export default WaterDailyNorma;
