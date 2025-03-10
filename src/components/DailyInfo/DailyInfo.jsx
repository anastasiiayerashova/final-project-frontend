import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';
import WaterList from '../WaterList/WaterList';

const DailyInfo = () => {
  return (
    <div className={s.dailyInfo}>
      <div className={s.dateAndBtnWrapper}>
        <ChooseDate />
        {/* TODO Кнопку AddWaterBtn рендеримо тільки якщо дата "Сьогодні". Для цього зі стора потрібно отримати обрану користувачем дату (за замовчуванням вона - "Сьогодні") */}
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
