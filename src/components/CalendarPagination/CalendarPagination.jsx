import { format } from 'date-fns';
import css from './CalendarPagination.module.css';

const CalendarPagination = ({ currentMonth, onPrevMonth, onNextMonth }) => {


    return (
        <div className={css.container}>
            <button className={css.button} onClick={onPrevMonth}>&lt;</button>
            <span className={css.text}>{format(currentMonth, 'MMMM, yyyy')}</span>
            <button className={css.button} onClick={onNextMonth}>&gt;</button>
        </div>
    );
};

export default CalendarPagination;