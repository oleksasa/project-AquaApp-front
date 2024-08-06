import { format } from "date-fns";
import css from './CalendarItem.module.css';

const CalendarItem = ({ date, onClick, dailyWaterIntake, dailyGoal, isSelected }) => {
    const percentage = dailyGoal ? (dailyWaterIntake / dailyGoal) * 100 : 0;
    const btn = percentage >= 100 ? css.completed : css.incomplete;

    return (
        <div className={css.container}>
            <button
            className={`${css.button} ${btn} ${isSelected ? css.selected : ''}`}
            onClick={() => onClick(date)}
            aria-label={`Day ${format(date, 'd')}`}
            >
            {format(date, 'd')}
            </button>
            <div className={css.percentage}>{Math.round(percentage)}%</div>
        </div>
        
    );
};

export default CalendarItem;