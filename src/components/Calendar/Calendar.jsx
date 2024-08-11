import { eachDayOfInterval, startOfMonth, endOfMonth, startOfDay } from "date-fns";
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { useSelector } from "react-redux";
import { selectTotalWaterPerDay } from "../../redux/water/selectors";



const Calendar = ({ currentMonth, onDayClick, selectedDay }) => {
    
    const dailyWaterData = useSelector(selectTotalWaterPerDay);
    console.log('Daily Water Data:', dailyWaterData);

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    

    return (
        <div className={css.container}>
            {days.map(day => {
                // const formattedDate = format(day, 'yyyy-MM-dd');
                // const dailyWaterIntake = dailyWaterData[formattedDate]
                // ? dailyWaterData[formattedDate].dailyWaterIntake || 0
                // : 0;
                // console.log(`Formatted Date: ${formattedDate}, Intake: ${dailyWaterIntake}`);

                const isSelected = startOfDay(day).getTime() === startOfDay(selectedDay).getTime();
            
            return (
                <CalendarItem
                key={day.toISOString()}
                date={day}
                onClick={onDayClick}
                dailyWaterIntake={dailyWaterData}
                isSelected={isSelected}
                />
            );
            })}
        </div>
    );
};

export default Calendar;