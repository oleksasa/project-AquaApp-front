import React from 'react';
import sprite from '../../../public/sprite.svg';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <div className={css.logoWrapper}>
      <svg className={css.logo}>
        <use xlinkHref={`${sprite}#icon-AquaTrack`} />
      </svg>
    </div>
  );
}
