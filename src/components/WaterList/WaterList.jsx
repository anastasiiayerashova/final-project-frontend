import WaterItem from '../WaterItem/WaterItem';
import s from './WaterList.module.css';

const WaterList = ({openEditWaterModal}) => {
  return (
    <ul className={s.list}>
      <li>
        <WaterItem openEditWaterModal={openEditWaterModal} />
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
