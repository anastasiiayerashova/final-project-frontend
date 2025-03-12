import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';
import { TYPE } from '../../constants/index.js';

const DailyInfo = ({ openWaterModal }) => {
  
  const handleAddWaterClick = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  const handleEditWaterClick = () => {
    openWaterModal({ isOpen: true, type: TYPE.EDIT_WATER });
  };

  return (
    <div className={s.dailyInfo}>
      <div className={s.dateAndBtnWrapper}>
        <ChooseDate />
        {/* TODO Кнопку AddWaterBtn рендеримо тільки якщо дата "Сьогодні". Для цього зі стора потрібно отримати обрану користувачем дату (за замовчуванням вона - "Сьогодні") */}
        <AddWaterBtn inDailyInfo={true} onClick={handleAddWaterClick}/>
      </div>
      <WaterList openEditWaterModal={handleEditWaterClick} />
    </div>
  );
};

export default DailyInfo;
