import icons from "../../../public/symbol-defs.svg";

export default function BtnIcon({ id, className }) {
    return (
      <svg className={className}>
        <use href={`${icons}#icon-${id}`} />
      </svg>
    );
}