import css from "./UserBar.module.css";

export default function UserBar() {
  return (
    <>
      <button>
        User name
        <img src="" alt="User's Avatar" />
      </button>
      <UserBarPopover />
    </>
  );
}
