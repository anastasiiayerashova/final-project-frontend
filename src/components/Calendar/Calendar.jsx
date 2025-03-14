import s from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectMonth,
  selectMonthData,
} from '../../redux/water/selectors';
import { fetchWaterMonth } from '../../redux/water/operations';
import { useEffect } from 'react';

const Calendar = () => {
  const monthRedux = useSelector(selectMonth);
  const daysArrayRedux = useSelector(selectMonthData);

  const isLoading = useSelector(selectLoading);

  const dispatch = useDispatch();

  // Разбираем строку "YYYY-MM" на year и month
  const [year, month] = monthRedux.split('-').map(Number);

  // Определяем количество дней в месяце
  const daysInMonth = new Date(year, month, 0).getDate();

  // Создаем массив дней (от 1 до дней в месяце)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(fetchWaterMonth(monthRedux));
  }, [dispatch, monthRedux]);

  return (
    <ul className={s.calendar}>
      {daysArray.map((day) => {
        // Создаем полную дату в формате ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
        const fullDate = new Date(Date.UTC(year, month - 1, day)).toISOString();

        return (
          <li key={day} className={s.day}>
            <CalendarItem date={fullDate} />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar;
