import s from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import { selectDailyWaterNorm } from '../../redux/user/selectors.js';
import { useTranslation } from 'react-i18next';
import { selectDate, selectDayWaterList } from '../../redux/water/selectors.js';
import i18next from 'i18next';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const dailyWaterNorm = useSelector(selectDailyWaterNorm);
  const dayWaterList = useSelector(selectDayWaterList);

  const date = useSelector(selectDate).split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat(i18next.language, {
      month: 'long',
    }).format(dateObj);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day}, ${capitalizedMonth}`;
  };
  const dateFormatted = formatDate(date);

  const isFutureDate = date > today;

  const totalWaterDrunk = isFutureDate
    ? 0
    : dayWaterList.reduce((total, item) => total + item.value, 0);
  
  const displayedPercentage = isFutureDate
    ? 0
    : Math.min(
    Math.round((totalWaterDrunk / dailyWaterNorm) * 100),
    100,
  );
  const exceededPercentage = Math.min(
    Math.round((totalWaterDrunk / dailyWaterNorm) * 100),
  );

  return (
    <div className={`${s.container} second-step`}>
      <div className={s.data}>
        <p>{date === today ? t('trackerPage.today') : dateFormatted}</p>
      </div>
      <div className={s.progressBar}>
        <div
          className={s.progressBarFill}
          style={{
            width: `${displayedPercentage}%`,
            backgroundColor: displayedPercentage >= 100 ? '#1E90FF' : '#9be1a0',
          }}
        >
          {displayedPercentage < 100 && (
            <p
              className={s.percentNumber}
              style={{ color: '#9BE1A0', zIndex: 1 }}
            >
              {`${displayedPercentage}%`}
            </p>
          )}
          <div
            className={s.progressBarFill}
            style={{
              width: `${displayedPercentage}%`,
              backgroundColor:
                displayedPercentage >= 100 ? '#1E90FF' : '#9be1a0',
            }}
          >
            {exceededPercentage > 100 && (
              <p
                className={s.percentNumber}
                style={{ color: '#1E90FF', zIndex: 1 }}
              >
                {`${exceededPercentage}%`}{' '}
                {/* Показуємо проценти, якщо більше 100% */}
              </p>
            )}
          </div>
        </div>

        <div
          className={s.slider}
          style={{
            left: `${displayedPercentage}%`,
            border:
              displayedPercentage >= 100
                ? 'solid 1px #1E90FF'
                : 'solid 1px #9BE1A0',
            transform: `translate(-50%, -50%)`,
          }}
        ></div>
      </div>
      <div className={s.sliderScale}>
        <span className={s.scaleMark} style={{ left: '0%' }}>
          0%
        </span>
        <span className={s.scaleMark} style={{ left: '50%' }}>
          50%
        </span>
        <span className={s.scaleMark} style={{ left: '100%' }}>
          100%
        </span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
