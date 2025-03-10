import { useState } from 'react';
import s from './WaterProgressBar.module.css'
const WaterProgressBar = () => {
//     const [value, setValue] = useState(50);
//     const handleInputChange = (e) => {
//     setValue(e.target.value);
//   };
    return (
        <div className={s.container}>
        <div className={s.data}>
          <p>Today</p>
        </div>
            <div className={s.sliderContainer}>
            <input
                type="range"
                id="slider"
                min="0"
                max="100"
                // value={value}
                // onChange={handleInputChange}
                />
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