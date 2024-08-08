import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isAfter } from 'date-fns';
import css from './WaterStatistics.module.css';

const WaterStatistics = ({ currentMonth, waterData }) => {
    // Функція для отримання даних за місяцем до поточної дати
    const getMonthData = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const today = new Date();
        const lastDay = isAfter(today, end) ? end : today; // Визначаємо останній день для графіка
        const days = eachDayOfInterval({ start, end: lastDay });

        // Створення масиву даних для графіка
        return days.map(day => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            return {
                date: format(day, 'd MMM'),
                waterIntake: waterData[formattedDate]?.dailyWaterIntake || 0
            };
        });
    };

    const monthData = getMonthData();

    return (
        <div className={css.container}>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={monthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="waterIntake" stroke="#87D28D" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaterStatistics;