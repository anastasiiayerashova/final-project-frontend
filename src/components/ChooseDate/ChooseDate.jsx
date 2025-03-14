import { useSelector } from 'react-redux';
import s from './ChooseDate.module.css';
import { selectDate } from '../../redux/water/selectors';

const ChooseDate = () => {
  const date = useSelector(selectDate);
  const day = new Date(date).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getUTCDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      dateObj,
    );
    return `${day}, ${month}`;
  };
  const formattedDate = formatDate(date);

  return (
    <div>
      <h3 className={s.title}>{day === today ? 'Today' : formattedDate}</h3>
    </div>
  );
};

export default ChooseDate;
