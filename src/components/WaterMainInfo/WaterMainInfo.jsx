import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import s from './WaterMainInfo.module.css';
import { TYPE } from '../../constants/index.js';
import LanguageButtons from '../LanguageButtons/LanguageButtons.jsx';
import { useTranslation } from 'react-i18next';

const WaterMainInfo = ({ openWaterModal }) => {
  const { t } = useTranslation();
  const handleOpenAddWaterModal = () => {
    openWaterModal({ isOpen: true, type: TYPE.ADD_WATER });
  };

  return (
    <div className={s.waterContainer}>
      <div className={s.logo}>
        <Logo />
        <LanguageButtons />
      </div>

      <WaterDailyNorma />
      <div className={`${s.progress} progress`}>
        <WaterProgressBar />
      </div>
      <div className={s.btn}>
        <AddWaterBtn onClick={handleOpenAddWaterModal} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
