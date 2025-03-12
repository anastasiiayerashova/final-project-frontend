import WaterItem from '../WaterItem/WaterItem';
import s from './WaterList.module.css';

const WaterList = ({openEditWaterModal, openDeleteWaterModal}) => {
  return (
    <ul className={s.list}>
      <li>
        <WaterItem openEditWaterModal={openEditWaterModal} openDeleteWaterModal={openDeleteWaterModal} />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
      <li>
        <WaterItem />
      </li>
    </ul>
  );
};

export default WaterList;
