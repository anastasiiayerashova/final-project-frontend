import { useDispatch } from 'react-redux';
import s from './CalendarItem.module.css';
import { setDate, setDaySelected } from '../../redux/water/slice';

const CalendarItem = ({ date }) => {
  const dispatch = useDispatch();

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
      <div className={`${s.dayNumber} ${day === today ? s.today : ''}`}>
        {dayNumber}
      </div>
      <div className={s.percent}>0%</div>
    </button>
  );
};

export default CalendarItem;
