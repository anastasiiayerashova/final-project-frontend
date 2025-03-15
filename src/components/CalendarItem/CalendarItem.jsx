import { useDispatch, useSelector } from 'react-redux';
import s from './CalendarItem.module.css';
import { setDate, setDaySelected } from '../../redux/water/slice';
import { selectDate } from '../../redux/water/selectors';

const CalendarItem = ({ date, percentage, loading }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);

  const today = new Date().toISOString().split('T')[0];
  const day = new Date(date).toISOString().split('T')[0];
  const fullDay = new Date(date).toISOString();
  const dayNumber = new Date(date).getUTCDate();

  const handleDate = () => {
    dispatch(setDaySelected(true));
    dispatch(setDate(fullDay));
  };

  return (
    <button type="button" className={s.dayBtn} onClick={handleDate}>
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
