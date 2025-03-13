import { useState } from 'react';
import s from './WaterProgressBar.module.css'
import { useSelector } from 'react-redux';
import { selectDailyWaterNorm } from '../../redux/user/selectors.js';

const WaterProgressBar = () => {
  const dailyWaterNorm = useSelector(selectDailyWaterNorm)
  const displayedPercentage = 0
  
    return (
        <div className={s.container}>
        <div className={s.data}>
          <p>Today</p>
        </div>
            <div className={s.progressBar}>
        <div
          className={s.progressBarFill}
          style={{
            width: `${displayedPercentage}%`,
            backgroundColor: displayedPercentage >= 100 ? '#7fffd4' : '#9be1a0',
          }}
        >
          {displayedPercentage < 100 && (
            <p className={s.percentNumber} style={{ color: '#9be1a0' }}>
              {`${displayedPercentage}%`}
            </p>
          )}
        </div>
        <div
          className={s.slider}
          style={{
            left: `${displayedPercentage}%`,
            border:
              displayedPercentage >= 100
                ? 'solid 1px #7fffd4'
                : 'solid 1px #9be1a0',
            transform: `translate(-50%, -50%)`,
          }}
        ></div>
      </div>
      <div className={s.sliderScale}>
        <span className={s.scaleMark} style={{ left: '0%' }}>0%</span>
        <span className={s.scaleMark} style={{ left: '50%' }}>50%</span>
        <span className={s.scaleMark} style={{ left: '100%' }}>100%</span>
      </div>
    
    </div>
    )
 }

export default WaterProgressBar;