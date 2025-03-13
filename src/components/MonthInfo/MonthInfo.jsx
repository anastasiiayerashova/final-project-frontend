import Calendar from '../Calendar/Calendar';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import s from './MonthInfo.module.css';

const MonthInfo = () => {
  const svgIcon = '/sprite.svg';

  return (
    <div className={s.MonthInfo}>
      <div className={s.MonthInfoHeader}>
        <h3 className={s.title}>Month</h3>
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
