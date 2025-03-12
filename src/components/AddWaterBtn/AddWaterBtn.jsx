import s from './AddWaterBtn.module.css';
import { TYPE } from '../../constants/index.js';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/selectors';
import { useMemo } from 'react';

const AddWaterBtn = ({ openWaterModal }) => {
  const svgIcon = '/sprite.svg';

  const date = useSelector(selectDate);
  const today = new Date();

  // Дата у форматі YYYY-MM-DD
  const formattedDate = useMemo(() => date.split('T')[0], [date]);

  // Перевіряємо, чи є дата майбутньою
  const isFutureDate = new Date(formattedDate) > today;

  const handleOpenWaterModal = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  return (
    <button
      type="button"
      className={`${s.addWaterBtn} ${isFutureDate ? s.inactive : ''}`}
      onClick={handleOpenWaterModal}
      disabled={isFutureDate}
    >
      <div className={s.iconWrap}>
        <svg className={s.icon}>
          <use href={`${svgIcon}#plus-green`} />
        </svg>
      </div>
      Add water
    </button>
  );
};

export default AddWaterBtn;
