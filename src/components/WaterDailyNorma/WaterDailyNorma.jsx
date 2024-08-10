import css from './WaterDailyNorma.module.css';

export default function WaterDailyNorma() {
  const myDailyNorma =
    Number(1.5); /* daily norma is need to take from Backend*/

  return (
    <div className={css.container}>
      <div>
        <p className={css.dailyNorma}>{myDailyNorma} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </div>
  );
}
