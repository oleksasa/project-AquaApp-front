import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';

import css from './WaterMainInfo.module.css';
import AddWaterBtnProgressSection from '../AddWaterBtnProgressSection/AddWaterBtnProgressSection';

export default function WaterMainInfo() {
  return (
    <section className={css.section}>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtnProgressSection />
    </section>
  );
}
