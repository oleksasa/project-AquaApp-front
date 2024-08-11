
import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const Calendar = ({ currentMonth, onDayClick, dailyWaterData }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        if (today >= startOfMonth(currentMonth) && today <= endOfMonth(currentMonth)) {
            setSelectedDate(today);
        } else {
            setSelectedDate(startOfMonth(currentMonth));
        }
        
    }, [currentMonth]);

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    

    const handleDayClick = (date) => {
        setSelectedDate(date);
        onDayClick(date);
    };

    return (
        <div className={css.container}>
            {days.map(day => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const dailyWaterIntake = dailyWaterData[formattedDate]?.dailyWaterIntake || 0;
            
            return (
                <CalendarItem
                key={day}
                date={day}
                onClick={handleDayClick}
                dailyWaterIntake={dailyWaterIntake}
                isSelected={selectedDate && day.toDateString() === selectedDate.toDateString()}
                />
            );
            })}
        </div>
    );
};

export default Calendar;