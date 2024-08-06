import css from './WaterDailyNorma.module.css';

export default function WaterDailyNorma() {
  const myDailyNorma = Number(1.5);

  return (
    <div className={css.container}>
      <p className={css.dailyNorma}>{myDailyNorma}L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
