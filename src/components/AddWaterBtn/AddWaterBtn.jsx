import clsx from 'clsx';
import s from './AddWaterBtn.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/selectors';
import { useMemo } from 'react';

const AddWaterBtn = ({ onClick, small, inDailyInfo }) => {
  const svgIcon = '/sprite.svg';

  const date = useSelector(selectDate);
  const today = new Date();

  // Дата у форматі YYYY-MM-DD
  const formattedDate = useMemo(() => date.split('T')[0], [date]);

  // Перевіряємо, чи є дата майбутньою
  const isFutureDate = new Date(formattedDate) > today;

  return !inDailyInfo ? (
    <button
      type="button"
      className={clsx(small ? s.small : s.btn)}
      onClick={onClick}
    >
      <span className={s.plus}></span>Add water
    </button>
  ) : (
    <button
      type="button"
      className={`${s.detailsAddBtn} ${isFutureDate ? s.inactive : ''}`}
      onClick={onClick}
    >
      <div className={s.iconContainer}>
        <svg className={s.icon}>
          <use href={`${svgIcon}#plus-green`} />
        </svg>
      </div>
      <p className={s.detailsBtnText}>Add water</p>
    </button>
  );
};
export default AddWaterBtn;
