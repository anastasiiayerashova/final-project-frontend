import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Logo from "../Logo/Logo.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import s from "./WaterMainInfo.module.css";
import { TYPE } from "../../constants/index.js";

const WaterMainInfo = ({ openWaterModal }) => {
    
    const handleOpenAddWaterModal = () => {
        openWaterModal({isOpen: true, type: TYPE.ADD_WATER})
    }
    
    return (
        <div className={s.waterContainer}>
            <div className={s.logo}>
                <Logo />
            </div>
                <WaterDailyNorma/>
            <div className={s.progress}>
                <WaterProgressBar/>
            </div>
            <div className={s.btn}>
                <AddWaterBtn onClick={handleOpenAddWaterModal} />
            </div>
        </div>
    )
}

export default WaterMainInfo