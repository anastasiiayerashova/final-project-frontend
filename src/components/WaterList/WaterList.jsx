import WaterItem from '../WaterItem/WaterItem';
import s from './WaterList.module.css';

const WaterList = ({ openWaterModal }) => {
  return (
    <ul className={s.list}>
      <li>
        <WaterItem openWaterModal={openWaterModal} />
      </li>
      <li>
        <WaterItem openWaterModal={openWaterModal} />
      </li>
    </ul>
  );
};

export default WaterList;
