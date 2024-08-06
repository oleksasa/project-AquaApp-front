import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";

export default function WaterList() {
  //   const waters = useSelector();

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
