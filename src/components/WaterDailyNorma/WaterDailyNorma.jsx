import { selectDailyWaterNorm } from '../../redux/user/selectors.js';
import s from './WaterDailyNorma.module.css'
import { useSelector } from 'react-redux';

const WaterDailyNorma = () => {

    const dailyWaterNorm = useSelector(selectDailyWaterNorm)

    const dailyWaterNormInLiters = (dailyWaterNorm / 1000).toFixed(1)

    return (
        <div className={s.container}>
            <p className={s.normal}>{`${dailyWaterNormInLiters} L`}</p>
            <p className={s.text}>My daily norma</p>
        </div>
    )
}

export default WaterDailyNorma;