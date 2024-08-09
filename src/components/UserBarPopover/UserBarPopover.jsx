import { useDispatch } from 'react-redux';
import Icon from '../Icon/Icon';
import css from './UserBarPopover.module.css';
import { logOut } from '../../redux/auth/operations';

export default function UserBarPopover({ style }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.wrapper} style={style}>
      <button className={css.btnSet} type="button">
        <div className={css.wrapIcon}>
          <Icon id="settings" className={css.icon} />
        </div>
        Settings
      </button>
      <button className={css.btnLogOut} type="button" onClick={handleLogOut}>
        <div className={css.wrapIcon}>
          <Icon id="log-out" className={css.iconLog} />
        </div>
        Log Out
      </button>
    </div>
  );
}
