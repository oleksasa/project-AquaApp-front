import { useSelector } from 'react-redux';
import { selectPercentPerDay } from '../../redux/water/selectors';
import css from './WaterProgressBar.module.css';

export default function WaterProgressBar() {
  // % of water drink from Backend
  const rect1 = Number(useSelector(selectPercentPerDay));

  // const rect2 = 100 - rect1;

  return (
    <div className={css.container}>
      <p className={css.today}>Today</p>
      <div className={css.rectBox}>
        <span
          className={css.rectangle}
          style={{
            /* Rectangle 1 */
            width: `${rect1}%`,
            background: '#9be1a0',
          }}
        ></span>
        <span className={css.ellipse}></span>
        {(13 <= rect1) & (rect1 <= 35) || (57 <= rect1) & (rect1 <= 81) ? (
          <span className={css.percent}>{rect1}%</span>
        ) : null}
        <span
          className={css.rectangle}
          style={{
            /* Rectangle 2 */
            width: `${rect1}%`,
            background: '#F0EFF4',
          }}
        ></span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className={css.percentScale}>0%</p>
        <p className={css.percentScale}>50%</p>
        <p className={css.percentScale}>100%</p>
      </div>
    </div>
  );
}
