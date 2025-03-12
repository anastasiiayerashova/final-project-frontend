import s from './WaterItem.module.css';
import { TYPE } from '../../constants/index.js';
import { MODAL_NAME } from '../../constants/index.js';

const WaterItem = ({ openWaterModal }) => {
  const svgIcon = '/sprite.svg';

  const handleOpenEditWaterModal = () => {
    openWaterModal({ isOpen: true, type: TYPE.EDIT_WATER });
  };

  const handleOpenDeleteWaterModal = () => {
    console.log('Show DeleteWaterModal');
    // TODO Створити логіку відкриття модального вікна
  };

  return (
    <div className={s.item}>
      <div className={s.iconWrap}>
        <svg className={s.svgIconGlass}>
          <use href={`${svgIcon}#water-glass`} />
        </svg>
      </div>
      <div className={s.info}>
        <p className={s.volume}>250 ml</p>
        <p className={s.time}>7:00 AM</p>
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
