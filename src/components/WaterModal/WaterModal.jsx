import { useEffect, useState } from "react";
import s from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm.jsx";
import { TYPE, MODAL_NAME } from "../../constants/index.js";

const WaterModal = ({ onClose, type }) => {
    
    return (
        <div className={s.waterModal}>
            <h2 className={s.title}>
            {type === TYPE.ADD_WATER ? (
             'Add water') : (
            <>
             Edit the entered amount <br /> of water
            </>
)}
            </h2>
            <p className={s.subtitle}>
                {type === TYPE.ADD_WATER ? 'Correct entered data:' : 'Choose a value'}
            </p>
            <WaterForm/>
        </div>
    );
};

export default WaterModal;