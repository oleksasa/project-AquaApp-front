import css from './AddWaterBtnProgressSection.module.css';
import BaseModal from '../BaseModal/BaseModal';
import WaterModal from '../WaterModal/WaterModal';
import { useState } from 'react';
import IconProgressSection from '../IconProgressSection/IconProgressSection';

export default function AddWaterBtnProgressSection() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className={css.btnAddWaterProgressSection}
        type="button"
        onClick={openModal}
      >
        <IconProgressSection className={css.iconProgressSection} />
        Add water
      </button>
      <BaseModal isOpen={isOpen} onRequestClose={closeModal}>
        <WaterModal props={'add'} onRequestClose={closeModal} />
      </BaseModal>
    </>
  );
}
