import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';
import s from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = ({ openWaterModal }) => {
  return (
    <div className={s.WaterDetailedInfo}>
      <UserPanel />
      <DailyInfo openWaterModal={openWaterModal} />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
