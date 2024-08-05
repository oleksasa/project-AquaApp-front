import css from "./AddWaterBtn.module.css";
import Icon from "../Icon/Icon";

export default function AddWaterBtn() {
  return (
    <>
      <button className={css.btnAddWater} type="button">
        <Icon id="plus" className={css.icon} />
        Add water
      </button>
    </>
  );
}
