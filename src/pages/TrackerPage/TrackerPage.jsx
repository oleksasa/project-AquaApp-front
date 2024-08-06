import { useState } from 'react';
import MonthInfo from '../../components/MonthInfo/MonthInfo';
import { addMonths, subMonths } from 'date-fns';

const TrackerPage = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentMonth, setCurrentMonth] = useState( new Date());

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    };

    const handlePrevMonth = () => {
        handleMonthChange(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        handleMonthChange(addMonths(currentMonth, 1));
    };

    return (
        <div>
            <MonthInfo
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            />
        </div>
    );
};

export default TrackerPage;

