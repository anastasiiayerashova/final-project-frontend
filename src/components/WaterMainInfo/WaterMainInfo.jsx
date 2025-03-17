import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import s from './WaterMainInfo.module.css';
import { TYPE } from '../../constants/index.js';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';

const WaterMainInfo = ({ tourOn, openWaterModal }) => {
  const { t } = useTranslation();
  const handleOpenAddWaterModal = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  return (
    <div className={s.waterContainer}>
      <div className={s.logo}>
        <div className={s.tour_wrap}>
          <Logo />
          <button className={s.tour_btn} onClick={tourOn}>
            {t('common.help')}
          </button>
        </div>
        <LanguageButtons />
      </div>

      <WaterDailyNorma />
      <div className={s.progress}>
        <WaterProgressBar />
      </div>
      <div className={s.btn}>
        <AddWaterBtn onClick={handleOpenAddWaterModal} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
