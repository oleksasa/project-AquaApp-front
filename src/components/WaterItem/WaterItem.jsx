import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from './WaterItem.module.css';
import { useState } from 'react';
import BaseModal from '../BaseModal/BaseModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../WaterModal/WaterModal';
import { getTimeFromDate } from '../../helpers/dateRequire';

export default function WaterItem({ water }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openDeleteModal = () => setIsOpenDeleteModal(true);
  const closeDeleteModal = () => setIsOpenDeleteModal(false);

  const timeWater = getTimeFromDate(water.date);

  return (
    <div className={css.wrapItem}>
      <Icon id="cup-water" className={css.icon} />
      <div>
        <p className={css.textML}>{water.volume} ml</p>
        <p className={css.textTime}>{timeWater}</p>
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
          <WaterModal water={water} onRequestClose={closeEditModal} />
        </BaseModal>
        <BaseModal isOpen={isOpenDeleteModal} onRequestClose={closeDeleteModal}>
          <DeleteWaterModal waterId={water._id} onClose={closeDeleteModal} />
        </BaseModal>
      </div>
    </div>
  );
}
