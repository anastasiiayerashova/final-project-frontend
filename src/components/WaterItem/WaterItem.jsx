import s from './WaterItem.module.css';
import { TYPE } from '../../constants/index.js';
import { setWaterId } from '../../redux/water/slice.js';
import { useDispatch } from 'react-redux';

const WaterItem = ({ openWaterModal, setDeleteWaterModal, data }) => {
  const svgIcon = '/sprite.svg';

  const dispatch = useDispatch();

  if (!data) {
    return <p className={s.error}>Error: No data available</p>;
  }

  // Проверяем, есть ли дата, иначе устанавливаем "N/A"
  const formattedTime = data.date
    ? new Date(data.date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : 'N/A';

  const handleOpenEditWaterModal = () => {
    dispatch(setWaterId(data._id));
    openWaterModal({ isOpen: true, type: TYPE.EDIT_WATER });
  };

  const handleOpenDeleteWaterModal = () => {
    dispatch(setWaterId(data._id));
    setDeleteWaterModal(true);
  };

  return (
    <div className={s.item}>
      <div className={s.iconWrap}>
        <svg className={s.svgIconGlass}>
          <use href={`${svgIcon}#water-glass`} />
        </svg>
      </div>
      <div className={s.info}>
        <p className={s.volume}>{data?.value || '0'} ml</p>
        <p className={s.time}>{formattedTime}</p>
      </div>
      <div className={s.buttons}>
        <button
          className={s.btn}
          type="button"
          onClick={handleOpenEditWaterModal}
        >
          <svg className={s.svgIconEdit}>
            <use href={`${svgIcon}#edit-2`} />
          </svg>
        </button>
        <button
          className={s.btn}
          type="button"
          onClick={handleOpenDeleteWaterModal}
        >
          <svg className={s.svgIconTrash}>
            <use href={`${svgIcon}#trash`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
