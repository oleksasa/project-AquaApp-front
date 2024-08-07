import css from './AddWaterBtn.module.css';
import Icon from '../Icon/Icon';
import BaseModal from '../BaseModal/BaseModal';
import WaterModal from '../WaterModal/WaterModal';
import { useState } from 'react';

export default function AddWaterBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className={css.btnAddWater} type="button" onClick={openModal}>
        <Icon id="plus" className={css.icon} />
        Add water
      </button>
      <BaseModal isOpen={isOpen} onRequestClose={closeModal}>
        <WaterModal props={'add'} onRequestClose={closeModal} />
      </BaseModal>
    </>
  );
}
