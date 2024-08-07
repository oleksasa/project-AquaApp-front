
import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import CalendarItem from '../CalendarItem/CalendarItem.jsx';
import css from './Calendar.module.css';

const Calendar = ({ currentMonth, onDayClick }) => {

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const today = new Date();
        setSelectedDate(today);
    }, []);

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    // дані вказані для прикладу
    const dailyGoal = 2000;
    
    const waterData = days.reduce((acc, day) => {
        acc[format(day, 'yyyy-MM-dd')] = {
            dailyWaterIntake: Math.random() * dailyGoal,
        };
        return acc;
    }, {});

    const handleDayClick = (date) => {
        setSelectedDate(date);
        onDayClick(date);
    };

    return (
        <div className={css.container}>
            {days.map(day => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const dailyWaterIntake = waterData[formattedDate]?.dailyWaterIntake || 0;
            
            return (
                <CalendarItem
                key={day}
                date={day}
                onClick={handleDayClick}
                dailyWaterIntake={dailyWaterIntake}
                dailyGoal={dailyGoal}
                isSelected={selectedDate && day.toDateString() === selectedDate.toDateString()}
                />
            );
            })}
        </div>
    );
};

export default Calendar;