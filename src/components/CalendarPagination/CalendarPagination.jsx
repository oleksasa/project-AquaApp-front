import { format, subMonths, addMonths } from 'date-fns';
import css from './CalendarPagination.module.css';
import Icon from '../Icon/Icon';

const CalendarPagination = ({ currentMonth, onMonthChange }) => {
    const handlePrevMonth = () => {
        const prevMonth = subMonths(currentMonth, 1);
        onMonthChange(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
        onMonthChange(nextMonth);
    };


    return (
        <div className={css.container}>
            <button className={css.button} onClick={handlePrevMonth}>
            <Icon id="icon-left" className={css.icon}/>
            </button>
            <span className={css.text}>{format(currentMonth, 'MMMM, yyyy')}</span>
            <button className={css.button} onClick={handleNextMonth}>
                <Icon id="icon-right" className={css.icon}/>
            </button>
        </div>
    );
};

export default CalendarPagination;