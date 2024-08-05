import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";

export default function UserPanel() {
  return (
    <div className={css.wrapper}>
      <p className={css.textUser}>
        Hello, <span className={css.textUserName}>User Name!</span>
      </p>
      <UserBar />
    </div>
  );
}
