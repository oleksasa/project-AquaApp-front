
import { useSelector } from 'react-redux';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, startOfDay } from "date-fns";
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { selectTotalWaterPerDay } from '../../redux/water/selectors.js';

const Calendar = ({ currentMonth, onDayClick }) => {
    const dailyWaterData = useSelector(selectTotalWaterPerDay);

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    const today = startOfDay(new Date());

    return (
        <div className={css.container}>
            {days.map(day => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const dailyWaterIntake = dailyWaterData && dailyWaterData[formattedDate]
                ? dailyWaterData[formattedDate].dailyWaterIntake || 0
                : 0;

                const isSelected = startOfDay(day).getTime() === today.getTime();
            
            return (
                <CalendarItem
                key={day.toISOString()}
                date={day}
                onClick={onDayClick}
                dailyWaterIntake={dailyWaterIntake}
                isSelected={isSelected}
                />
            );
            })}
        </div>
    );
};

export default Calendar;