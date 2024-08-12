import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import css from './WaterDailyNorma.module.css';

export default function WaterDailyNorma() {
  /* daily norma from Backend*/
  const myDailyNorma = Number(useSelector(selectUser).dailyRateWater);

  return (
    <div className={css.container}>
      <div>
        <p className={css.dailyNorma}>{myDailyNorma} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </div>
  );
}
