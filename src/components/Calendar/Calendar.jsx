import { useState } from 'react';
import s from './Calendar.module.css';

const Calendar = () => {
  // TODO Поточну дату отримуємо зі store (за замовчуванням - Сьогодні)
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Визначаємо кількість днів на місяці (враховує високосні роки)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Робимо масив днів
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // TODO Стан обраного дня отримуємо зі store (за замовчуванням null)
  const [selectedDay, setSelectedDay] = useState(null);

  // Відправляємо в store обрану дату
  const handleSelectDay = (day) => {
    const selectedDate = new Date(year, month, day);
    // TODO Відправити dispatch в store щодо обраного дня (повна дата)
    console.log(`Selected date is: ${selectedDate.toDateString()}`);
    setSelectedDay(day);
  };

  return (
    <div className={s.calendar}>
      {daysArray.map((day) => {
        // Перевіряємо чи це число масива є Сьогодні
        const isToday =
          day === todayDate && month === todayMonth && year === todayYear;

        return (
          <div key={day} className={s.day}>
            <button
              className={`${s.dayNumber} ${isToday ? s.today : ''} ${
                selectedDay === day ? s.selected : ''
              }`}
              onClick={() => handleSelectDay(day)}
            >
              {day}
            </button>
            <div className={s.percent}>100%</div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
