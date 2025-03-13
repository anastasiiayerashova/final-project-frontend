import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';
import { TYPE } from '../../constants/index.js';

const DailyInfo = ({ openWaterModal, setDeleteWaterModal }) => {
  
  const handleAddWater = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

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
        {/* TODO Кнопку AddWaterBtn рендеримо тільки якщо дата "Сьогодні". Для цього зі стора потрібно отримати обрану користувачем дату (за замовчуванням вона - "Сьогодні") */}
        <AddWaterBtn inDailyInfo={true} onClick={handleAddWater}/>
      </div>
      <WaterList openEditWaterModal={handleEditWater} openDeleteWaterModal={handleDeleteWater}/>
    </div>
  );
};

export default DailyInfo;
