import { useEffect, useState } from "react";
import s from "./WaterModal.module.css";

const WaterModal = ({ closeModal }) => {
    const [amount, setAmount] = useState(250);

    const handleStepChange = (step) => {
        setAmount((prevAmount) => {
            const newAmount = prevAmount + step;
            return Math.min(5000, Math.max(0, newAmount)); // ограничиваем 0 - 5000
        });
    };

    const handleInputChange = (e) => {
        let value = Number(e.target.value);
        if (isNaN(value)) return; // защита от NaN

        value = Math.min(5000, Math.max(0, value)); // ограничиваем диапазон
        setAmount(value);
    };

 useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, []);
    return (
        <div className={s.backdrop} onClick={closeModal}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={closeModal}>
                    <svg className={s.iconX}>
                        <use href='../../../public/sprite.svg#x'></use>
                    </svg>
                </button>
                <h2 className={s.title}>Edit the entered amount <br/> of water</h2>
                <p className={s.subtitle}>Correct entered data:</p>
                
                <div className={s.amountWrap}>
                     <label htmlFor="amount" className={s.descrAmount}>
                            Amount of water:
                        </label>
                    <div className={s.controls}>
                        
                         <button className={s.minus} type="button" onClick={() => handleStepChange(-50)}>
                             <svg className={s.iconMinus}>
                                <use href='../../../public/sprite.svg#minus_plus'></use>
                            </svg>
                        </button>
                        <input className={s.input} id="amount" value={amount} readOnly />
                        <button className={s.plus} type="button" onClick={() => handleStepChange(50)}>
                              <svg className={s.iconPlus}>
                                <use href='../../../public/sprite.svg#plus_minuc'></use>
                                </svg>
                        </button>
                     </div>
                
                </div>
                <label  htmlFor="timeInput" className={s.timeLabel}>Recording time:</label>
                <input  className={s.timeInput}
                    id="timeInput"
                    type="text"
                    placeholder='7:00' //add time
                    readOnly />
                
                <label htmlFor="waterInput" className={s.manualInput}>
                    Enter the value of the water used:
                    </label>
                    <input 
                        type="number"
                        id="waterInput"
                        className={s.waterInput}
                    placeholder='250' 
                    value = {amount}
                        onChange={handleInputChange}
                    />
                    <button className={s.saveBtn}>Save</button>
            </div>
        </div>
    );
};

export default WaterModal;