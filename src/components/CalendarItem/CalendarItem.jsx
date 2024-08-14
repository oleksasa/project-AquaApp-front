import { format } from 'date-fns';
import css from './CalendarItem.module.css';

const CalendarItem = ({ date, onClick, percentage, isSelected }) => {

  const btnClass = percentage >= 100 ? `${css.completed} ${css.completed-100}` : css.incomplete;

  return (
    <div className={css.container}>
      <button
        className={`${css.button} ${btnClass} ${isSelected ? css.selected : ''}`}
        onClick={() => onClick(format(date, 'yyyy-MM-dd'))}
        aria-label={`Day ${format(date, 'd')}`}
      >
        {format(date, 'd')}
      </button>
      <div className={css.percentage}>{Math.round(percentage)}%</div>
    </div>
  );
};

export default CalendarItem;
