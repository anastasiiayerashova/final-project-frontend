import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
} from 'recharts';
import s from './Chart.module.css'
import { useSelector } from 'react-redux';
import { selectMonthData } from '../../redux/water/selectors.js';
import Dot from '../ChartDot/ChartDot.jsx';

const WaterChart = () => {
    
    const waterData = useSelector(selectMonthData);
    console.log(waterData)
  
    const formattedData = waterData
    .filter((item) => item.totalAmount > 0)
    .map((item) => {
        const [year, month, day] = item.date.split('-'); 
        return {
            date: `${month}.${day}`, 
            day: Number(day), 
            originalAmount: item.totalAmount,
        };
    })
    .sort((a, b) => a.day - b.day);

    const totalAmount = formattedData.reduce(
        (acc, obj) => acc + obj.originalAmount,
        0
    );

    const formatYAxisTick = (tick, index) => {
        if (index === 0) {
            return '0l';
        }
        return `${(tick / 1000).toFixed(1)} l`;
    };

    return (
        <div className={s.graphic_wrapper}>
            {totalAmount > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 10, }}>
                        <defs>
                            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#87CEEB' stopOpacity={1} />
                                <stop offset='100%' stopColor='#ADD8E6' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='date' tickLine={false} tickMargin={21} />
                        <YAxis
                            domain={[0, 'auto']}
                            tickCount={6}
                            tickFormatter={formatYAxisTick}
                            label={{ angle: -90, position: 'insideLeft' }}
                            tickLine={false}
                            tickMargin={53}
                            tick={{ textAnchor: 'start' }}
                        />
                        <Tooltip cursor={false} position={{ y: -30 }} content={<Dot />} />
                        <Area
                            type='monotone'
                            dataKey='originalAmount'
                            stroke='#5B9BD5'
                            fill='url(#colorUv)'
                            dot={{
                                fill: '#fff',
                                stroke: '#5B9BD5',
                                strokeWidth: 2,
                                r: 8,
                                fillOpacity: 1,
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