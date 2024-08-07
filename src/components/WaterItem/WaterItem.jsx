import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from './WaterItem.module.css';
import { useState } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';

export default function WaterItem() {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openDeleteModal = () => setIsOpenDeleteModal(true);
  const closeDeleteModal = () => setIsOpenDeleteModal(false);

  return (
    <div className={css.wrapItem}>
      <Icon id="cup-water" className={css.icon} />
      <div>
        <p className={css.textML}>250 ml</p>
        <p className={css.textTime}>7:00</p>
      </div>
      <div className={css.wrapBtn}>
        <button className={css.btnIcon} type="button" onClick={openEditModal}>
          <Icon id="pen" className={css.iconPen} />
        </button>
        <button
          className={clsx(css.btnIcon, css.btnIconTrash)}
          type="button"
          onClick={openDeleteModal}
        >
          <Icon id="trash" className={css.iconTrash} />
        </button>
        <BaseModal isOpen={isOpenEditModal} onRequestClose={closeEditModal}>
          <WaterModal />
        </BaseModal>
        <BaseModal isOpen={isOpenDeleteModal} onRequestClose={closeDeleteModal}>
          <DeleteWaterModal />
        </BaseModal>
      </div>
    </div>
  );
}
