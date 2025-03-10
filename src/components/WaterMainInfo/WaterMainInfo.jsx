import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import Logo from "../Logo/Logo.jsx";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx";
import s from "./WaterMainInfo.module.css";
import WaterModal from "../WaterModal/WaterModal.jsx";

const WaterMainInfo = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
    return (
        <div className={s.waterContainer}>
            
                <div className={s.logo}><Logo /></div>
    
                
                
                    <WaterDailyNorma/>
            
            <div className={s.progress}>
                <WaterProgressBar/>
            </div>
            <div className={s.btn}>
                <AddWaterBtn onClick={openModal} />
            </div>
            {modalIsOpen && <WaterModal closeModal={closeModal} />}
        </div>
    )
}

export default WaterMainInfo