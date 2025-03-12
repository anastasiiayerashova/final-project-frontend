import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';

const DailyInfo = ({ openWaterModal }) => {
  return (
    <div className={s.dailyInfo}>
      <div className={s.dateAndBtnWrapper}>
        <ChooseDate />
        <AddWaterBtn openWaterModal={openWaterModal} inDailyInfo={true} />
      </div>
      <WaterList openWaterModal={openWaterModal} />
    </div>
  );
};

export default DailyInfo;
