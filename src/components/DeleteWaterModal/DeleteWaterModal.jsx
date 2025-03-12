import { useState } from 'react';
import { MODAL_NAME } from '../../constants/index.js';
import s from './DeleteWaterModal.module.css'

const DeleteWaterModal = ({ onClose }) => {

    const handleCloseModal = () => onClose(MODAL_NAME.DELETE_WATER_MODAL)
    const [isBtnDisabled, setBtnDisabled] = useState(false)

      return (
        <div className={s.delete_wrapper}>
           <div className={s.delete_desc}>
              <h3>Delete entry</h3>
              <p>Are you sure you want to delete the entry?</p>
           </div>
           <div className={s.delete_btns}>
              <button className={`${s.button} ${s.delete_btn}`}>Delete</button>
              <button className={`${s.button} ${s.cancelBtn}`} onClick={handleCloseModal}>Cancel</button>
           </div>
        </div>
  );
};

export default DeleteWaterModal