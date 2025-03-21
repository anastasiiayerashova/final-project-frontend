import { useDispatch, useSelector } from 'react-redux';
import s from './CalendarItem.module.css';
import { setDate, setDaySelected } from '../../redux/water/slice';
import { selectDate } from '../../redux/water/selectors';
import { selectDailyWaterNorm } from '../../redux/user/selectors';

const CalendarItem = ({ date, totalAmount, loading }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const dailyWaterNorm = useSelector(selectDailyWaterNorm);

  const today = new Date().toISOString().split('T')[0];
  const day = new Date(date).toISOString().split('T')[0];
  const fullDay = new Date(date).toISOString();
  const dayNumber = new Date(date).getUTCDate();

  const handleDate = () => {
    dispatch(setDaySelected(true));
    dispatch(setDate(fullDay));
  };

  const percentage = Math.min(
    100,
    Math.round((totalAmount / dailyWaterNorm) * 100),
  );

  return (
    <button
      type="button"
      className={`${s.dayBtn} ${day > today ? s.disabled : ''}`}
      onClick={handleDate}
    >
      <div
        className={`${s.dayNumber} ${day === today ? s.today : ''} ${
          selectedDate === fullDay ? s.selected : ''
        } ${percentage === 100 ? s.completed : ''} ${loading ? s.loading : ''}`}
      >
        {dayNumber}
      </div>
      <div className={s.percent}>{percentage}%</div>
    </button>
  );
};

export default CalendarItem;
