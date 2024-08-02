import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";

export default function DailyInfo() {
  return (
    <>
      <ChooseDate />
      <AddWaterBtn />
      <WaterList />
    </>
  );
}
