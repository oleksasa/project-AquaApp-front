import css from './WaterProgressBar.module.css';

export default function WaterProgressBar() {
  const rect1 = 60;
  const rect2 = 100 - rect1;

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
        {(15 <= rect1) & (rect1 <= 30) || (60 <= rect1) & (rect1 <= 75) ? (
          <span className={css.percent}>{rect1}%</span>
        ) : null}
        <span
          className={css.rectangle}
          style={{
            /* Rectangle 2 */
            width: `${rect2}%`,
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
