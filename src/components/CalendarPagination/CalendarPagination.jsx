import { format, subMonths, addMonths } from 'date-fns';
import css from './CalendarPagination.module.css';
import BtnIcon from '../BtnIcon/BtnIcon';

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
                <BtnIcon id="icon-left"/>
            </button>
            <span className={css.text}>{format(currentMonth, 'MMMM, yyyy')}</span>
            <button className={css.button} onClick={handleNextMonth}>
                <BtnIcon id="icon-right"/>
            </button>
        </div>
    );
};

export default CalendarPagination;