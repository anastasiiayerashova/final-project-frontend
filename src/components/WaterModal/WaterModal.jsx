import { useEffect, useState } from 'react';
import s from './WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm.jsx';
import { TYPE, MODAL_NAME } from '../../constants/index.js';
import { useTranslation } from 'react-i18next';

const WaterModal = ({ onClose, type }) => {
  const { t } = useTranslation();
  return (
    <div className={s.waterModal}>
      <h2 className={s.title}>
        {type === TYPE.ADD_WATER ? (
          t('common.add_water')
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: t('waterModal.edit_entered_amount'),
            }}
          />
        )}
      </h2>
      <p className={s.subtitle}>
        {type === TYPE.ADD_WATER
          ? t('waterModal.entered_data')
          : t('waterModal.choose_value')}
      </p>
      <WaterForm />
    </div>
  );
};

export default WaterModal;
