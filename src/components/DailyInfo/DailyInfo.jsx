import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';
import { TYPE } from '../../constants/index.js';

const DailyInfo = ({ openWaterModal, setDeleteWaterModal }) => {
  const handleAddWater = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  const handleDeleteWater = () => {
    setDeleteWaterModal(true);
  };

  return (
    <div className={s.dailyInfo}>
      <div className={s.dateAndBtnWrapper}>
        <ChooseDate />
        <AddWaterBtn inDailyInfo={true} onClick={handleAddWater} />
      </div>
      <WaterList
        openWaterModal={openWaterModal}
        openDeleteWaterModal={handleDeleteWater}
        setDeleteWaterModal={setDeleteWaterModal}
      />
    </div>
  );
};

export default DailyInfo;
