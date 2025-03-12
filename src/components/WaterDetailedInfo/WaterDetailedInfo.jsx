import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';
import s from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = ({
  openWaterModal,
  setDeleteWaterModal,
  setLogoutModal,
}) => {
  return (
    <div className={s.WaterDetailedInfo}>
      <UserPanel setLogoutModal={setLogoutModal} />
      <DailyInfo
        openWaterModal={openWaterModal}
        setDeleteWaterModal={setDeleteWaterModal}
      />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
