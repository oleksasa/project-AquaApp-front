import { useState } from 'react';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import MonthInfo from '../../components/MonthInfo/MonthInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from "./TrackerPage.module.css";
import { addMonths, subMonths } from 'date-fns';

export default function TrackerPage () {
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
        <div className={css.container}>
            <WaterMainInfo />
            <WaterDetailedInfo 
            selectedDay={selectedDay}/>
            <MonthInfo
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            />
        </div>
    );
}

