import s from './ChooseDate.module.css';

const ChooseDate = () => {
  return (
    <div>
      {/* TODO Отримати дані зі стора щодо обраної користувачем дати. За замовчуванням - Today */}
      <h3 className={s.title}>Today</h3>
    </div>
  );
};

export default ChooseDate;
