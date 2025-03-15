import s from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import { selectDailyWaterNorm } from '../../redux/user/selectors.js';
import { useTranslation } from 'react-i18next';
import { selectDate, selectDayWaterList } from '../../redux/water/selectors.js';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const dailyWaterNorm = useSelector(selectDailyWaterNorm);
  const dayWaterList = useSelector(selectDayWaterList);

  const date = useSelector(selectDate).split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getUTCDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      dateObj,
    );
    return `${day}, ${month}`;
  };
  const dateFormatted = formatDate(date);

  const totalWaterDrunk = dayWaterList.reduce(
    (total, item) => total + item.value,
    0,
  );
  const displayedPercentage = Math.min(
    Math.round((totalWaterDrunk / dailyWaterNorm) * 100),
    100,
  );
  const exceededPercentage = Math.min(
    Math.round((totalWaterDrunk / dailyWaterNorm) * 100),
  );

  return (
    <div className={s.container}>
      <div className={s.data}>
        <p>{date === today ? t('trackerPage.today') : dateFormatted}</p>
      </div>
      <div className={s.progressBar}>
        <div
          className={s.progressBarFill}
          style={{
            width: `${displayedPercentage}%`,
            backgroundColor: displayedPercentage >= 100 ? '#7fffd4' : '#9be1a0',
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
                displayedPercentage >= 100 ? '#7fffd4' : '#9be1a0',
            }}
          >
            {exceededPercentage > 100 && (
              <p
                className={s.percentNumber}
                style={{ color: '#9BE1A0', zIndex: 1 }}
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
                ? 'solid 1px #7fffd4'
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
