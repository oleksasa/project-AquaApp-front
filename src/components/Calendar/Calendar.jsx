import { format, eachDayOfInterval, startOfMonth, endOfMonth, startOfDay } from "date-fns";
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';


const Calendar = ({ currentMonth, onDayClick, selectedDay, waterData }) => {

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const waterDataMap = waterData.reduce((acc, { date, percentage }) => {
        acc[date] = { percentage: parseFloat(percentage) || 0};
        return acc;
    }, {});


    return (
        <div className={css.container}>
            {days.map(day => {
                // форматуємо дату, щоб отримати ключ з waterData
                const formattedDate = format(day, 'yyyy-MM-dd');
                const dailyData = waterDataMap[formattedDate] || {};
                const percentage = dailyData.percentage || 0;
                const isSelected = startOfDay(day).getTime() === startOfDay(selectedDay).getTime();
            
            return (
                <CalendarItem
                key={day.toISOString()}
                date={day}
                onClick={onDayClick}
                percentage={percentage}
                isSelected={isSelected}
                />
            );
            })}
        </div>
    );
};

export default Calendar;