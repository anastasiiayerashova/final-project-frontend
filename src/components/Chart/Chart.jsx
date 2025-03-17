import { useState, useMemo, useEffect } from 'react';
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';
import s from './Chart.module.css';
import { useSelector } from 'react-redux';
import { selectDate, selectMonthData } from '../../redux/water/selectors.js';
import Dot from '../ChartDot/ChartDot.jsx';
import { useTranslation } from 'react-i18next';

const WaterChart = () => {
  const { t } = useTranslation();
  const waterData = useSelector(selectMonthData);
  const currentDate = useSelector(selectDate);
  const svgIcon = '/sprite.svg';

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const selectedDay = currentDate ? new Date(currentDate).getDate() : 1;

  // Визначаємо рік і місяць із даних або використовуємо поточні
  const [year, month] =
    waterData.length > 0
      ? waterData[0].date.split('-').map(Number)
      : [new Date().getFullYear(), new Date().getMonth() + 1];

  // Визначаємо кількість днів на місяці
  const daysInMonth = new Date(year, month, 0).getDate();

  // Формуємо масив даних, заповнюючи відсутні дні нулями
  const formattedData = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const formattedDay = String(day).padStart(2, '0');
      const entry = waterData.find(
        (item) => Number(item.date.split('-')[2]) === day,
      );

      return {
        date: formattedDay,
        amount: entry ? entry.totalAmount : 0,
      };
    });
  }, [waterData, daysInMonth]);

  // Розбиваємо дані на тижні
  const weeks = useMemo(() => {
    const weeksArray = [];
    for (let i = 0; i < formattedData.length; i += 7) {
      weeksArray.push(formattedData.slice(i, i + 7));
    }
    return weeksArray;
  }, [formattedData]);

  // Визначаємо початковий тиждень
  const initialWeekIndex = Math.floor((selectedDay - 1) / 7);

  const [currentWeek, setCurrentWeek] = useState(0);

  // Встановлюємо правильний тиждень після завантаження
  useEffect(() => {
    if (initialWeekIndex >= 0 && initialWeekIndex < weeks.length) {
      setCurrentWeek(initialWeekIndex);
    }
  }, [initialWeekIndex, weeks.length]);

  // Перемикання тижнів
  const prevWeek = () => {
    if (currentWeek > 0) setCurrentWeek(currentWeek - 1);
  };

  const nextWeek = () => {
    if (
      currentWeek < weeks.length - 1 &&
      (year !== currentYear ||
        month !== currentMonth ||
        (currentWeek + 1) * 7 < currentDay)
    ) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  // Перевіряємо, чи є поточний тиждень "активним" (поточний тиждень поточного місяця)
  const isCurrentWeek =
    year === currentYear &&
    month === currentMonth &&
    currentDay >= currentWeek * 7 + 1 &&
    currentDay <= (currentWeek + 1) * 7;

  return (
    <div className={s.chartWrap}>
      <div className={s.controls}>
        <button type="button" onClick={prevWeek} disabled={currentWeek === 0}>
          <svg className={s.svgIconLeft}>
            <use href={`${svgIcon}#chevron-down`} />
          </svg>
        </button>
        <div className={s.week}>
          {isCurrentWeek
            ? t('trackerPage.currentWeek')
            : t('trackerPage.week', { weekNumber: currentWeek + 1 })}
        </div>
        <button
          type="button"
          onClick={nextWeek}
          disabled={currentWeek === weeks.length - 1 || isCurrentWeek}
        >
          <svg className={s.svgIconRight}>
            <use href={`${svgIcon}#chevron-up`} />
          </svg>
        </button>
      </div>

      {weeks.length > 0 && weeks[currentWeek] ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={weeks[currentWeek]}
            margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
          >
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" />
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="lightgray" strokeWidth="1" />
              </pattern>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
                <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: '#323f47' }}
              padding={{ left: 20 }}
            />
            <YAxis
              domain={[0, 'auto']}
              tickCount={6}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#323f47' }}
               tickFormatter={(tick) =>
                t('trackerPage.liters', { value: (tick / 1000).toFixed(1) })
              }
              padding={{ bottom: 10 }}
            />
            <Tooltip cursor={false} content={<Dot />} />
            <Area
              type="linear"
              dataKey="amount"
              stroke="#87d28d"
              strokeWidth="2px"
              fill="url(#colorUv)"
              dot={{
                fill: '#fff',
                stroke: '#87d28d',
                fillOpacity: 1,
                strokeWidth: 2,
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p className={s.without_data}>No data yet</p>
      )}
    </div>
  );
};

export default WaterChart;
