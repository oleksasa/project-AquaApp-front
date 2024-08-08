import { format } from "date-fns";
import css from './CalendarItem.module.css';
import { myDailyNorma } from '../WaterDailyNorma/WaterDailyNorma';

const CalendarItem = ({ date, onClick, dailyWaterIntake, isSelected }) => {
    const percentage = myDailyNorma > 0 ? (dailyWaterIntake / myDailyNorma) * 100 : 0;
    const btnClass = percentage >= 100 ? css.completed : css.incomplete;

    return (
        <div className={css.container}>
            <button
            className={`${css.button} ${btnClass} ${isSelected ? css.selected : ''}`}
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