/* LogOutModal jsx */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import s from './LogOutModal.module.css'
import { MODAL_NAME } from "../../constants/index.js";

const LogOutModal = ({ onClose }) => {

  const handleCloseModal = () => onClose(MODAL_NAME.LOGOUT_MODAL)
  const [isBtnDisabled, setBtnDisabled] = useState(false)

  const dispatch = useDispatch()

  return (
          <div className={s.delete_wrapper}>
             <div className={s.delete_desc}>
                <h3>Log out</h3>
                <p>Do you really want to leave?</p>
             </div>
             <div className={s.delete_btns}>
                <button className={`${s.button} ${s.delete_btn}`}>Log out</button>
                <button className={`${s.button} ${s.cancelBtn}`} onClick={handleCloseModal}>Cancel</button>
             </div>
          </div>
    );
  };

export default LogOutModal;