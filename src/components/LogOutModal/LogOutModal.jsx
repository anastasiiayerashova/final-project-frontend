/* LogOutModal jsx */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import s from './LogOutModal.module.css'
import { MODAL_NAME } from "../../constants/index.js";
import { logoutUserOperation } from "../../redux/user/operations.js";

const LogOutModal = ({ onClose }) => {

  const handleCloseModal = () => onClose(MODAL_NAME.LOGOUT_MODAL)

  const dispatch = useDispatch()

  const handleLogout = (e) => {
    dispatch(logoutUserOperation())
  }

  return (
          <div className={s.delete_wrapper}>
             <div className={s.delete_desc}>
                <h3>Log out</h3>
                <p>Do you really want to leave?</p>
             </div>
             <div className={s.delete_btns}>
                <button className={`${s.button} ${s.delete_btn}`} onClick={handleLogout}>Log out</button>
                <button className={`${s.button} ${s.cancelBtn}`} onClick={handleCloseModal}>Cancel</button>
             </div>
          </div>
    );
  };

export default LogOutModal;