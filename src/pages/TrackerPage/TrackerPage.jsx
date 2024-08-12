import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
// import MonthInfo from '../../components/MonthInfo/MonthInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { dateToday } from '../../helpers/dateRequire.js';
import { addWater, fetchDailyWater } from '../../redux/water/operations.js';

export default function TrackerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyWater(dateToday()));
  }, [dispatch]);

  return (
    <Layout
      leftComponent={{
        component: <WaterMainInfo />,
        bg: 'var(--color-second-bg)',
      }}
      rightComponent={{
        component: <WaterDetailedInfo />,
        bg: 'var(--color-main-bg)',
      }}
    />
  );
}
