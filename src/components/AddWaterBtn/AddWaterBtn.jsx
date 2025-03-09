import s from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const svgIcon = '/sprite.svg';

  const handleOpenWaterModal = () => {
    console.log('Show WaterModal');
    // TODO Створити логіку відкриття модального вікна
  };

  return (
    <button
      type="button"
      className={s.addWaterBtn}
      onClick={handleOpenWaterModal}
    >
      <span className={s.iconWrap}>
        <span className={s.iconPlus}></span>
      </span>
      Add water
    </button>
  );
};

export default AddWaterBtn;
