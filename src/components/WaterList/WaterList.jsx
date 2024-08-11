import { useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { selectWater } from '../../redux/water/selectors';

export default function WaterList() {
  const waters = useSelector(selectWater);

  return (
    <div className={css.container}>
      <ul className={css.wrapList}>
        {waters.map(water => (
          <li key={water._id}>
            <WaterItem water={water} />
          </li>
        ))}
      </ul>
    </div>
  );
}
