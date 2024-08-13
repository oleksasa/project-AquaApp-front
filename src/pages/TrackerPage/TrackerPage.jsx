import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
// import MonthInfo from '../../components/MonthInfo/MonthInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { fetchMonthlyWater } from '../../redux/water/operations.js';
import { selectTotalWaterPerMonth } from '../../redux/water/selectors.js';

export default function TrackerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyWater('2024-08'));
  }, [dispatch]);

  console.log(useSelector(selectTotalWaterPerMonth));
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
