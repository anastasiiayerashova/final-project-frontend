import { useDispatch, useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import s from './WaterList.module.css';
import {
  selectDate,
  selectDayWaterList,
  selectLoadingDaily,
} from '../../redux/water/selectors';
import { useEffect, useMemo } from 'react';
import { fetchWaterDaily } from '../../redux/water/operations';
import Loader from '../Loader/Loader';

const WaterList = ({ openWaterModal, setDeleteWaterModal }) => {
  const date = useSelector(selectDate);
  const dayWaterList = useSelector(selectDayWaterList);
  const isLoading = useSelector(selectLoadingDaily);
  const dispatch = useDispatch();

  const today = new Date();
  // Дата у форматі YYYY-MM-DD
  const formattedDate = useMemo(() => date.split('T')[0], [date]);
  // Перевіряємо, чи є дата майбутньою
  const isFutureDate = new Date(formattedDate) > today;

  useEffect(() => {
    if (!isFutureDate && formattedDate) {
      dispatch(fetchWaterDaily(formattedDate));
    }
  }, [dispatch, formattedDate, isFutureDate]);

  if (isFutureDate) {
    return (
      <div className={s.textWrapper}>
        <p>You cannot record water consumption for future dates.</p>
        <p>Please select a valid date.</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (dayWaterList.length === 0) {
    return (
      <div className={s.textWrapper}>
        <p>Looks like there is nothing here yet.</p>
        <p>Click "Add Water" to log your water intake for this day.</p>
      </div>
    );
  }

  return (
    <ul className={s.list}>
      {dayWaterList.map((item) => (
        <li key={item._id}>
          <WaterItem
            data={item}
            openWaterModal={openWaterModal}
            setDeleteWaterModal={setDeleteWaterModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default WaterList;
