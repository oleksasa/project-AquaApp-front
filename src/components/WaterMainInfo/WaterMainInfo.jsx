import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';

import css from './WaterMainInfo.module.css';

export default function WaterMainInfo() {
  return (
    <section className={css.section}>
      <p className={css.logo}>AquaTrack</p>
      <div className={css.backImg}></div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </section>
  );
}
