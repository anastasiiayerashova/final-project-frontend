import React from 'react';
import s from './LogOutModal.module.css';

const LogOutModal = ({ closeModal }) => {
  return (
    <div>
      <div className={s.backdrop} id="backdrop">
        <div id="successModal">
          <button type="button" id="closeModal">
            <svg width="12" height="12">
              <use href="./img/work-together-img/symbol-defs.svg#icon-modal-close"></use>
            </svg>
          </button>
          <h2>Log out</h2>
          <p>Do you really want to leave?</p>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
