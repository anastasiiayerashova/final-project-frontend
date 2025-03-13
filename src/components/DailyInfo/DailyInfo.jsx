import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';

const DailyInfo = ({ openWaterModal, setDeleteWaterModal }) => {
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
        openWaterModal={openWaterModal}
        openDeleteWaterModal={handleDeleteWater}
        setDeleteWaterModal={setDeleteWaterModal}
      />
    </div>
  );
};

export default DailyInfo;
