import s from './WaterItem.module.css';

const WaterItem = () => {
  const svgIcon = '/sprite.svg';

  const handleOpenWaterModal = () => {
    console.log('Show WaterModal');
    // TODO Створити логіку відкриття модального вікна
  };

  const handleOpenDeleteWaterModal = () => {
    console.log('Show DeleteWaterModal');
    // TODO Створити логіку відкриття модального вікна
  };

  return (
    <div className={s.item}>
      <div className={s.iconWrap}>
        <svg className={s.svgIconGlass}>
          <use href={`${svgIcon}#mage_water-glass-fill`} />
        </svg>
      </div>
      <div className={s.info}>
        <p className={s.volume}>250 ml</p>
        <p className={s.time}>7:00 AM</p>
      </div>
      <div className={s.buttons}>
        <button className={s.btn} type="button" onClick={handleOpenWaterModal}>
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
            <use href={`${svgIcon}#trash-04`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
