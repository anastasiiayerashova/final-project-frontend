import { useState } from 'react';
import s from './CalendarPagination.module.css';
import i18next from 'i18next';

const CalendarPagination = () => {
  const svgIcon = '/sprite.svg';

  // TODO Поточну дату отримуємо зі store (за замовчуванням - Сьогодні)
  // useState - це тимчасове рішення
  const [date, setDate] = useState(new Date());
  const formatDate = (date) => {
    const month = new Intl.DateTimeFormat(i18next.language, {
      month: 'long',
    }).format(date);
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };
  const formattedDate = formatDate(date);

  const handlePreviousMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1); // Ставимо 1-е число месяця
      newDate.setMonth(newDate.getMonth() - 1); // Змінюємо місяць
      return newDate;
    });
    // TODO Відправити dispatch в store на встановлення поточного місяця і року
  };

  const handleNextMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    // TODO Відправити dispatch в store на встановлення поточного місяця і року
  };

  return (
    <div className={s.CalendarPagination}>
      <button
        className={s.btnArrow}
        type="button"
        onClick={handlePreviousMonth}
      >
        <svg className={s.svgIconLeft}>
          <use href={`${svgIcon}#chevron-down`} />
        </svg>
      </button>
      <div className={s.date}>{formattedDate}</div>
      <button className={s.btnArrow} type="button" onClick={handleNextMonth}>
        <svg className={s.svgIconRight}>
          <use href={`${svgIcon}#chevron-up`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;
