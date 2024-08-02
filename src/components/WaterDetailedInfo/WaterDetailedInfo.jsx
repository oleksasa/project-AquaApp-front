import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
// import MonthInfo from "../MonthInfo/MonthInfo";

import css from "./WaterDetailedInfo.module.css";

export default function WaterDetailedInfo() {
  return (
    <div>
      <UserPanel />
      <DailyInfo />
      {/* <MonthInfo /> */}
    </div>
  );
}
