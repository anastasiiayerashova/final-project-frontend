import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';
import { TYPE } from '../../constants/index.js';

const DailyInfo = ({ openWaterModal, setDeleteWaterModal }) => {
  const handleEditWater = () => {
    openWaterModal({ isOpen: true, type: TYPE.EDIT_WATER });
  };

  const handleDeleteWater = () => {
    setDeleteWaterModal(true);
  };

  return (
    <div className={s.dailyInfo}>
      <div className={s.dateAndBtnWrapper}>
        <ChooseDate />
        <AddWaterBtn openWaterModal={openWaterModal} />
      </div>
      <WaterList
        openEditWaterModal={handleEditWater}
        openDeleteWaterModal={handleDeleteWater}
      />
    </div>
  );
};

export default DailyInfo;
