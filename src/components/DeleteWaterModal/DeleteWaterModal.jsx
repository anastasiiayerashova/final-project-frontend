import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import s from './DeleteWaterModal.module.css';
import {
  selectWaterId,
  selectDate,
  selectMonth,
} from '../../redux/water/selectors.js';
import { clearWaterId } from '../../redux/water/slice.js';
import {
  deleteWater,
  fetchWaterDaily,
  fetchWaterMonthly,
} from '../../redux/water/operations.js';
import { useTranslation } from 'react-i18next';
import { formattedErrorKey } from '../../i18n/utils/formattedErrorKey.js';

const DeleteWaterModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isBtnDisabled, setBtnDisabled] = useState(false);

  const waterId = useSelector(selectWaterId);
  const date = useSelector(selectDate);
  const dateFormatted = useMemo(() => date.split('T')[0], [date]);
  const month = useSelector(selectMonth);

  // Очищаємо waterId під час закриття модального вікна
  const handleClose = () => {
    dispatch(clearWaterId());
    onClose();
  };

  const handleDelete = async () => {
    try {
      setBtnDisabled(true);
      await dispatch(deleteWater(waterId)).unwrap();
      dispatch(clearWaterId());

      toast.success(t('notifications.water_deleted'));

      handleClose();

      await Promise.all([
        dispatch(fetchWaterDaily(dateFormatted)).unwrap(),
        dispatch(fetchWaterMonthly(month)).unwrap(),
      ]);
    } catch (error) {
        console.dir(error)
      if (error?.response?.status !== 404) {
        toast.error(t('errors.error_deleting_record', {
            error: error.message || t(`errors.${formattedErrorKey(error)}`),
          }));
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  // Очищаємо waterId при розмонтуванні компонента (якщо користувач просто закрив модалку)
  useEffect(() => {
    return () => {
      dispatch(clearWaterId());
    };
  }, [dispatch]);

  return (
    <div className={s.delete_wrapper}>
      <div className={s.delete_desc}>
        <h3>{t('deleteWaterModal.delete_entry')}</h3>
        <p>{t('deleteWaterModal.are_you_sure')}</p>
      </div>
      <div className={s.delete_btns}>
        <button
          className={`${s.button} ${s.delete_btn}`}
          onClick={handleDelete}
          disabled={isBtnDisabled}
        >
          {isBtnDisabled ? t('common.deleting') : t('common.delete')}
        </button>
        <button className={`${s.button} ${s.cancelBtn}`} onClick={handleClose}>
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
