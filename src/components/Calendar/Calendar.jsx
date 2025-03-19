import s from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoadingMonthly,
  selectMonth,
  selectMonthData,
} from '../../redux/water/selectors';
import { fetchWaterMonthly } from '../../redux/water/operations';
import { useEffect } from 'react';

const Calendar = () => {
  const monthRedux = useSelector(selectMonth);
  const daysArrayRedux = useSelector(selectMonthData);
  const isLoading = useSelector(selectLoadingMonthly);

  const dispatch = useDispatch();

  // Розбираємо рядок "YYYY-MM" на year та month
  const [year, month] = monthRedux.split('-').map(Number);

  // Визначаємо кількість днів на місяці
  const daysInMonth = new Date(year, month, 0).getDate();

  // Створюємо масив днів (від 1 до днів на місяць)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(fetchWaterMonthly(monthRedux));
  }, [dispatch, monthRedux]);

  return (
    <ul className={s.calendar}>
      {daysArray.map((day) => {
        // Створюємо рядок дати у форматі YYYY-MM-DD
        const formattedDate = `${year}-${String(month).padStart(
          2,
          '0',
        )}-${String(day).padStart(2, '0')}`;

        // Шукаємо дані для цього дня
        const dayData = daysArrayRedux.find(
          (entry) => entry.date === formattedDate,
        );

        const totalAmount = dayData ? dayData.totalAmount : 0;

        return (
          <li key={day} className={s.day}>
            <CalendarItem
              date={formattedDate}
              totalAmount={totalAmount}
              loading={isLoading}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar;
