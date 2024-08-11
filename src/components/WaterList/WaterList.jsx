import { useDispatch, useSelector } from 'react-redux';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { selectIsTodayDay, selectWater } from '../../redux/water/selectors';
import { useEffect } from 'react';
import { fetchDailyWater } from '../../redux/water/operations';
import { isTodayDayChoosing } from '../../redux/water/slice';

export default function WaterList() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDailyWater());
  // }, [dispatch]);

  // const waters = useSelector(selectWater);

  // console.log(waters);

  return (
    <div className={css.container}>
      <ul className={css.wrapList}>
        {/* {waters.map((water) => (
        <li key={water.id}>
          <WaterItem water={water} />
        </li>
      ))} */}
        <WaterItem />
        <WaterItem />
        <WaterItem />
        <WaterItem />
        <WaterItem />
      </ul>
    </div>
  );
}
