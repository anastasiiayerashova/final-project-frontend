import Calendar from '../Calendar/Calendar';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import s from './MonthInfo.module.css';
import { useTranslation } from 'react-i18next';
import WaterChart from '../Chart/Chart.jsx';
import { useState } from 'react';

const MonthInfo = () => {
  const svgIcon = '/sprite.svg';
  const { t } = useTranslation();
  const [isCalendar, setIsCalender] = useState(true);

  const handleClick = () => {
    setIsCalender(!isCalendar);
  };

  return (
    <div className={`${s.MonthInfo} sixth-step`}>
      <div className={s.MonthInfoHeader}>
        <h3 className={s.title}>
          {isCalendar
            ? t('trackerPage.month_general')
            : t('trackerPage.statistics')}
        </h3>
        <CalendarPagination />
        <button
          className={`${s.btnChart} seventh-step`}
          type="button"
          onClick={handleClick}
        >
          <svg className={s.svgIcon}>
            <use href={`${svgIcon}#pie-chart-colour`} />
          </svg>
        </button>
      </div>
      {isCalendar ? <Calendar /> : <WaterChart />}
    </div>
  );
};

export default MonthInfo;
