import s from './AddWaterBtn.module.css';
import { TYPE } from '../../constants/index.js';

const AddWaterBtn = ({ openWaterModal }) => {
  const svgIcon = '/sprite.svg';

  const handleOpenWaterModal = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  return (
    <button
      type="button"
      className={s.addWaterBtn}
      onClick={handleOpenWaterModal}
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
