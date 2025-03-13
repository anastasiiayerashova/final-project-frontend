import clsx from 'clsx';
import s from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = ({ onClick, small, inDailyInfo }) => {
  const { t } = useTranslation();
  return !inDailyInfo ? (
    <button className={clsx(small ? s.small : s.btn)} onClick={onClick}>
      <span className={s.plus}></span>
      {t('common.add_water')}
    </button>
  ) : (
    <button className={s.detailsAddBtn} onClick={onClick}>
      <div className={s.iconContainer}>
        <svg className={s.icon}>
          <use href="/sprite.svg#plus-green"></use>
        </svg>
      </div>
      <p className={s.detailsBtnText}>{t('common.add_water')}</p>
    </button>
  );
};
export default AddWaterBtn;
