import icons from "../../../public/symbol-defs.svg";

export default function BtnIcon({ id, className }) {
    return (
      <svg className={className} width={18} height={18}>
        <use href={`${icons}#icon-${id}`} />
      </svg>
    );
}