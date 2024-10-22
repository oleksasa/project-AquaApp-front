import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ onRequestClose }) {
  return (
    <div className={css.modal}>
      <h1 className={css.title}>Setting</h1>
      <UserSettingsForm onRequestClose={onRequestClose} />
    </div>
  );
}
