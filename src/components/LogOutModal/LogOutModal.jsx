import React from 'react';
import s from './LogOutModal.module.css';

const LogOutModal = ({ closeModal }) => {
  return (
    <div>
      <div className={s.backdrop} id="backdrop">
        <div class="modal" id="successModal">
          <button type="button" class="modal-close" id="closeModal">
            <svg class="modal-icon" width="12" height="12">
              <use href="./img/work-together-img/symbol-defs.svg#icon-modal-close"></use>
            </svg>
          </button>
          <h2 class="modalTitle common-span">Log out</h2>
          <p class="modalText">Do you really want to leave?</p>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
