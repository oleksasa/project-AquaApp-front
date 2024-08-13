import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import WaterStatistics from '../WaterStatistics/WaterStatistics';
import { format, addMonths, subMonths, startOfDay } from 'date-fns';
import css from './MonthInfo.module.css';
import BtnIcon from '../BtnIcon/BtnIcon';
import { fetchMonthlyWater, fetchDailyWater } from '../../redux/water/operations.js';
import { selectTotalWaterPerMonth, selectChoosingDay } from '../../redux/water/selectors.js';

const MonthInfo = () => {
    const dispatch = useDispatch();
    const [showStats, setShowStats] = useState(false);
    const [currentMonth, setCurrentMonth] = useState( new Date());
    const [selectedDay, setSelectedDay] = useState(startOfDay(new Date()));

    const formattedDate = format(currentMonth, 'MM-yyyy');
    const monthlyWaterData = useSelector( state => {
        const dataForMonth = selectTotalWaterPerMonth(state) || {};
        const monthData = dataForMonth[formattedDate] || {};
        // console.log('Data for month:', dataForMonth);
        // console.log('Monthly water data:', monthData);
        return monthData;

    });

    // const monthlyWaterData = useSelector(selectTotalWaterPerMonth(currentMonth));

    
    // const dailyWaterData = useSelector(selectTotalWaterPerDay);
    const selectedDayFromRedux = useSelector(selectChoosingDay);
    // const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        // if (isAuthenticated) {
        console.log('Current month:', format(currentMonth, 'yyyy-MM'));
        dispatch(fetchMonthlyWater(format(currentMonth, 'yyyy-MM')));
        // }
    }, [currentMonth, dispatch]);

    useEffect(() => {
        // if (isAuthenticated) {
        dispatch(fetchDailyWater(format(selectedDay, 'yyyy-MM-dd')));
        // }
    }, [selectedDay, dispatch]);

    useEffect(() => {
        if (selectedDayFromRedux) {
            setSelectedDay(new Date(selectedDayFromRedux));
        }
    }, [selectedDayFromRedux]);


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
        // if (isAuthenticated) {
        // dispatch(fetchDailyWater(format(day, 'yyyy-MM-dd')));
        setSelectedDay(day);
        // }
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
                waterData={monthlyWaterData}
                // dailyWaterData={dailyWaterData}
                selectedDay={selectedDay}
                />
            )}
        </div>
    );
};

export default MonthInfo;