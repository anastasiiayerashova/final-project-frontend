import { useState } from 'react';
import { MODAL_NAME } from '../../constants/index.js';
import s from './DeleteWaterModal.module.css';
import { useTranslation } from 'react-i18next';

const DeleteWaterModal = ({ onClose }) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose(MODAL_NAME.DELETE_WATER_MODAL);
  const [isBtnDisabled, setBtnDisabled] = useState(false);

  return (
    <div className={s.delete_wrapper}>
      <div className={s.delete_desc}>
        <h3>{t('deleteWaterModal.delete_entry')}</h3>
        <p>{t('deleteWaterModal.are_you_sure')}</p>
      </div>
      <div className={s.delete_btns}>
        <button className={`${s.button} ${s.delete_btn}`}>
          {t('common.delete')}
        </button>
        <button
          className={`${s.button} ${s.cancelBtn}`}
          onClick={handleCloseModal}
        >
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
