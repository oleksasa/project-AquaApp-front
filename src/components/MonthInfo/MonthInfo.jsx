import { useState, useEffect } from 'react';
import CalendarPagination from '../CalendarPagination.jsx';
import Calendar from '../Calendar.jsx';
import WaterStatistics from '../WaterStatistics';
import { format } from 'date-fns';
import css from './MonthInfo.module.css';

const MonthInfo = ({ currentMonth, onMonthChange, onDayClick, onPrevMonth, onNextMonth }) => {
    const [waterData, setWaterData] = useState({});
    const [showStats, setShowStats] = useState(false);

    const fetchWaterData = async (date) => {
        try {
            const response = await fetch(`/api/water-intake?date=${format(date, 'yyyy-MM')}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWaterData(data);
        } catch (error) {
            console.error('Failed to fetch water data:', error);
        }
    };

    useEffect(() => {
        fetchWaterData(currentMonth);
    }, [currentMonth]);


    const handleButtonClick = () => {
        setShowStats(prevShowStats => !prevShowStats);
    };

    const handleDayClick = (day) => {
        fetchWaterData(day);
        onDayClick(day);
    };

    const monthName = format(currentMonth, 'MMMM');

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css.title}>
                    {showStats ? 'Statistics' : monthName}
                </h1>
                <CalendarPagination
                currentMonth={onMonthChange}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
                />
                <button
                className={css.button}
                onClick={handleButtonClick}
                >
                    <svg className={css.icon}>
                        <use href={showStats ? '#icon-calendar' : '#icon-stats'}></use>
                    </svg>
                </button>
            </div>
            {showStats ? (
                <WaterStatistics
                currentMonth={currentMonth}
                waterData={waterData}
                />
            ) : (
                <Calendar
                currentMonth={currentMonth}
                onDayClick={handleDayClick}
                />
            )}
        </div>
    );
};

export default MonthInfo;