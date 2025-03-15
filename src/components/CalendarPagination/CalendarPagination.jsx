import { useEffect, useMemo } from 'react';
import s from './CalendarPagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../redux/water/selectors';
import { setMonth } from '../../redux/water/slice';
import { fetchWaterMonthly } from '../../redux/water/operations';
import i18next from 'i18next';

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const monthRedux = useSelector(selectMonth);
  const svgIcon = '/sprite.svg';

  // Поточний місяць у форматі "YYYY-MM"
  const currentMonth = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
  }, []);

  // Форматуємо дату як треба
  const formatMonth = (monthString) => {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    const formattedMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(date);
    return `${formattedMonth}, ${year}`;
  };
  const formattedDate = useMemo(() => formatMonth(monthRedux), [monthRedux]);

  const handlePreviousMonth = () => {
    const [year, month] = monthRedux.split('-').map(Number);
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    // Змінюємо місяць і рік у стор у відповідному форматі
    dispatch(setMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`));
  };

  const handleNextMonth = () => {
    const [year, month] = monthRedux.split('-').map(Number);
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    dispatch(setMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`));
  };

  // Робимо запит на бекенд
  useEffect(() => {
    dispatch(fetchWaterMonthly(monthRedux));
  }, [dispatch, monthRedux]);

  return (
    <div className={s.CalendarPagination}>
      <button
        className={s.btnArrow}
        type="button"
        onClick={handlePreviousMonth}
      >
        <svg className={s.svgIconLeft}>
          <use href={`${svgIcon}#chevron-down`} />
        </svg>
      </button>
      <div className={s.date}>{formattedDate}</div>
      <button
        className={s.btnArrow}
        type="button"
        onClick={handleNextMonth}
        disabled={monthRedux === currentMonth}
      >
        <svg className={s.svgIconRight}>
          <use href={`${svgIcon}#chevron-up`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
