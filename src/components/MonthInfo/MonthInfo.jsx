import { useState, useEffect } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import WaterStatistics from '../WaterStatistics/WaterStatistics';
import { format } from 'date-fns';
import css from './MonthInfo.module.css';
import { getDayWater, getMonthWater } from '../../api/water.js';

const MonthInfo = ({ currentMonth, onMonthChange, onDayClick, onPrevMonth, onNextMonth }) => {
    // const [waterData, setWaterData] = useState({});
    const [showStats, setShowStats] = useState(false);

    // const fetchWaterData = async (date) => {
    //     try {
    //         const response = await fetch(`/api/water-intake?date=${format(date, 'yyyy-MM')}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setWaterData(data);
    //     } catch (error) {
    //         console.error('Failed to fetch water data:', error);
    //     }
    // };

    useEffect(() => {
        getMonthWater(currentMonth);
    }, [currentMonth]);


    const handleButtonClick = () => {
        setShowStats(prevShowStats => !prevShowStats);
    };

    const handleDayClick = (day) => {
        getDayWater(day);
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