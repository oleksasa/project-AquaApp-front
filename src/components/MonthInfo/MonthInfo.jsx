import { useState, useEffect } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import WaterStatistics from '../WaterStatistics/WaterStatistics';
import { format, addMonths, subMonths } from 'date-fns';
import css from './MonthInfo.module.css';
import { getDayWater, getMonthWater } from '../../api/water.js';
import BtnIcon from '../BtnIcon/BtnIcon';

const MonthInfo = () => {
    const [showStats, setShowStats] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentMonth, setCurrentMonth] = useState( new Date());
    const [monthlyWaterData, setMonthlyWaterData]  = useState({});
    const [dailyWaterData, setDailyWaterData] = useState({});


    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    };

    const handlePrevMonth = () => {
        handleMonthChange(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        handleMonthChange(addMonths(currentMonth, 1));
    };


    useEffect(() => {
        const fetchMonthWater = async () => {
            const data = await getMonthWater(currentMonth);
            setMonthlyWaterData(data);
        };
        fetchMonthWater();
    }, [currentMonth]);

    useEffect(() => {
        if (selectedDay) {
            const fetchDayWater = async () => {
                const data = await getDayWater(selectedDay);
                setDailyWaterData(data);
            };
            fetchDayWater();
        }
    }, [selectedDay]);


    const handleButtonClick = () => {
        setShowStats(prevShowStats => !prevShowStats);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const monthName = format(currentMonth, 'MMMM');

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css.title}>
                    {showStats ? 'Statistics' : monthName}
                </h1>
                <CalendarPagination
                currentMonth={currentMonth}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onMonthChange={handleMonthChange}
                />
                <button
                className={css.button}
                onClick={handleButtonClick}
                >
                    {showStats ? <BtnIcon id="icon-pie-chart-01"/> : <BtnIcon id="icon-pie-chart-02"/>}
                    
                </button>
            </div>
            {showStats ? (
                <WaterStatistics
                currentMonth={currentMonth}
                waterData={monthlyWaterData}
                // dailyGoal={}
                />
            ) : (
                <Calendar
                currentMonth={currentMonth}
                onDayClick={handleDayClick}
                dailyWaterData={dailyWaterData}
                />
            )}
        </div>
    );
};

export default MonthInfo;