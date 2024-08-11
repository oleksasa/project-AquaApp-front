import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import WaterStatistics from '../WaterStatistics/WaterStatistics';
import { format, addMonths, subMonths } from 'date-fns';
import css from './MonthInfo.module.css';
import BtnIcon from '../BtnIcon/BtnIcon';
import { fetchMonthlyWater, fetchDailyWater } from '../../redux/water/operations.js';
import { selectTotalWaterPerMonth, selectTotalWaterPerDay, selectChoosingDay } from '../../redux/water/selectors.js';
import { selectIsAuthenticated } from '../../redux/auth/selectors.js';

const MonthInfo = () => {
    const dispatch = useDispatch();
    const [showStats, setShowStats] = useState(false);
    const [currentMonth, setCurrentMonth] = useState( new Date());

    const formattedDate = format(currentMonth, 'MM-yyyy');
    const monthlyWaterData = useSelector( state => {
        const dataForMonth = selectTotalWaterPerMonth(state) || {};
        return dataForMonth[formattedDate] || {};

    });

    
    const dailyWaterData = useSelector(selectTotalWaterPerDay) || {};
    const selectedDay = useSelector(selectChoosingDay) || null;
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
        dispatch(fetchMonthlyWater(format(currentMonth, 'yyyy-MM')));
        }
    }, [currentMonth, dispatch, isAuthenticated]);

    useEffect(() => {
        if (selectedDay && isAuthenticated) {
            dispatch(fetchDailyWater(format(selectedDay, 'yyyy-MM-dd')));
        }
    }, [selectedDay, dispatch, isAuthenticated]);


    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    };

    const handlePrevMonth = () => {
        handleMonthChange(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        handleMonthChange(addMonths(currentMonth, 1));
    };


    const handleButtonClick = () => {
        setShowStats(prevShowStats => !prevShowStats);
    };

    const handleDayClick = (day) => {
        if (isAuthenticated) {
        dispatch(fetchDailyWater(format(day, 'yyyy-MM-dd')));
        }
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
                    {showStats ? <BtnIcon id="pie-chart-01"/> : <BtnIcon id="pie-chart-02"/>}
                    
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