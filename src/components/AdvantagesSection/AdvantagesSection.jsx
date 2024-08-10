import React from 'react';
import css from './AdvantagesSection.module.css';
import UserCount from '../UserCount/UserCount';

export default function AdvantagesSection() {
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <UserCount />
      </div>

      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>Habit drive</li>
        <li className={css.advantagesStatistics}>View statistics</li>
        <li className={css.advantagesSetting}>Personal rate setting</li>
      </ul>
    </div>
  );
}
