import icons from "../../../public/sprite.svg";

export default function Icon({ id, className }) {
  return (
    <svg className={className}>
      <use href={`${icons}#icon-${id}`} />
    </svg>
  );
}
