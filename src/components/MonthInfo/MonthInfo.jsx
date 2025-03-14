import Calendar from '../Calendar/Calendar';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import s from './MonthInfo.module.css';
import { useTranslation } from 'react-i18next';

const MonthInfo = () => {
  const svgIcon = '/sprite.svg';
  const { t } = useTranslation();

  return (
    <div className={s.MonthInfo}>
      <div className={s.MonthInfoHeader}>
        <h3 className={s.title}>{t('trackerPage.month_general')}</h3>
        <CalendarPagination />
        <button className={s.btnChart} type="button">
          <svg className={s.svgIcon}>
            <use href={`${svgIcon}#pie-chart-colour`} />
          </svg>
        </button>
      </div>
      <Calendar />
    </div>
  );
};

export default MonthInfo;
