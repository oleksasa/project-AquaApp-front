import BaseModal from '../BaseModal/BaseModal';
import MainModal from '../MainModal/MainModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import Icon from '../Icon/Icon';
import css from './UserBarPopover.module.css';
import { useState } from 'react';

export default function UserBarPopover({ style }) {
  const [isOpenSettingsModal, setIsOpenSettingsModal] = useState(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState(false);
  const openSettingsModal = () => setIsOpenSettingsModal(true);
  const closeSettingsModal = () => setIsOpenSettingsModal(false);
  const openLogOutModal = () => setIsOpenLogOutModal(true);
  const closeLogOutModal = () => setIsOpenLogOutModal(false);

  return (
    <div className={css.wrapper} style={style}>
      <button className={css.btnSet} type="button" onClick={openSettingsModal}>
        <div className={css.wrapIcon}>
          <Icon id="settings" className={css.icon} />
        </div>
        Settings
      </button>
      <button className={css.btnLogOut} type="button" onClick={openLogOutModal}>
        <div className={css.wrapIcon}>
          <Icon id="log-out" className={css.iconLog} />
        </div>
        Log Out
      </button>
      <MainModal
        isOpen={isOpenSettingsModal}
        onRequestClose={closeSettingsModal}
      >
        <UserSettingsModal onRequestClose={closeSettingsModal} />
      </MainModal>
      <BaseModal isOpen={isOpenLogOutModal} onRequestClose={closeLogOutModal}>
        <LogOutModal onRequestClose={closeLogOutModal} />
      </BaseModal>
    </div>
  );
}
