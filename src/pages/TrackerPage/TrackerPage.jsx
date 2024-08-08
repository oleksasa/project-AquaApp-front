import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
// import MonthInfo from '../../components/MonthInfo/MonthInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from "./TrackerPage.module.css";

export default function TrackerPage() {
  return (
    <div className={css.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      {/* <MonthInfo/> */}
    </div>
  );
}
