import Icon from "../Icon/Icon";
import clsx from "clsx";
import css from "./WaterItem.module.css";

export default function WaterItem() {
  return (
    <div className={css.wrapItem}>
      <Icon id="cup-water" className={css.icon} />
      <div>
        <p className={css.textML}>250 ml</p>
        <p className={css.textTime}>7:00</p>
      </div>
      <div className={css.wrapBtn}>
        <button className={css.btnIcon} type="button">
          <Icon id="pen" className={css.iconPen} />
        </button>
        <button className={clsx(css.btnIcon, css.btnIconTrash)} type="button">
          <Icon id="trash" className={css.iconTrash} />
        </button>
      </div>
    </div>
  );
}
