import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import s from './DeleteWaterModal.module.css';
import { selectWaterId, selectDate } from '../../redux/water/selectors.js';
import { clearWaterId } from '../../redux/water/slice.js';
import { deleteWater, fetchWaterDaily } from '../../redux/water/operations.js';

const DeleteWaterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isBtnDisabled, setBtnDisabled] = useState(false);

  const waterId = useSelector(selectWaterId);
  const date = useSelector(selectDate);
  const dateFormatted = useMemo(() => date.split('T')[0], [date]);

  // Очищаем waterId при закрытии модального окна
  const handleClose = () => {
    dispatch(clearWaterId());
    onClose();
  };

  const handleDelete = async () => {
    try {
      setBtnDisabled(true);
      await dispatch(deleteWater(waterId)).unwrap();
      dispatch(clearWaterId());

      toast.success('Water record successfully deleted!');

      await dispatch(fetchWaterDaily(dateFormatted)).unwrap();

      handleClose();
    } catch (error) {
      if (error?.response?.status !== 404) {
        toast.error(`Error deleting record: ${error.message || error}`);
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  // Очищаем waterId при размонтировании компонента (если юзер просто закрыл модалку)
  useEffect(() => {
    return () => {
      dispatch(clearWaterId());
    };
  }, [dispatch]);

  return (
    <div className={s.delete_wrapper}>
      <div className={s.delete_desc}>
        <h3>Delete entry</h3>
        <p>Are you sure you want to delete the entry?</p>
      </div>
      <div className={s.delete_btns}>
        <button
          className={`${s.button} ${s.delete_btn}`}
          onClick={handleDelete}
          disabled={isBtnDisabled}
        >
          {isBtnDisabled ? 'Deleting...' : 'Delete'}
        </button>
        <button className={`${s.button} ${s.cancelBtn}`} onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
