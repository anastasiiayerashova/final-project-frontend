import WaterItem from '../WaterItem/WaterItem';
import s from './WaterList.module.css';

const WaterList = () => {
  return (
    <ul className={s.list}>
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
      <li>
        <WaterItem />
      </li>
    </ul>
  );
};

export default WaterList;
