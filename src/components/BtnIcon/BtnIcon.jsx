import icons from "../../../public/symbol-defs.svg";
import css from "./BtnIcon.module.css";

export default function BtnIcon({ id, className }) {
  const iconClass = (id === 'icon-pie-chart-01' || id === 'icon-pie-chart-02') ? css['icon-statistics'] : css['icon-pagination'];
    return (
      <svg className={`${className} ${iconClass}`} >
        <use href={`${icons}#${id}`}/>
      </svg>
    );
}