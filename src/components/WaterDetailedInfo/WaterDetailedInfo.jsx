import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import s from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = ({ openWaterModal }) => {
  return (
    <div className={s.WaterDetailedInfo}>
      <h2>UserPanel</h2>
      <DailyInfo openWaterModal={openWaterModal} />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
