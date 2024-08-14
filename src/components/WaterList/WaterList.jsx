import { useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import {
  selectTotalWaterPerDay,
  selectWater,
} from '../../redux/water/selectors';

export default function WaterList() {
  const waters = useSelector(selectWater);
  const isWater = useSelector(selectTotalWaterPerDay);

  return (
    <div className={css.container}>
      {isWater ? (
        <ul className={css.wrapList}>
          {waters.map(water => (
            <li key={water._id}>
              <WaterItem water={water} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>No water added yet!</p>
      )}
    </div>
  );
}
