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
                date: format(day, 'd'),
                waterIntake: waterData[formattedDate]?.dailyWaterIntake || 0
            };
        });
    };
    // дані для прикладу
    const dailyGoal = 3;

    const monthData = getMonthData();

    return (
        <div className={css.container}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={monthData}
                    margin={{ top: 50, right: 10, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="date"
                    interval={0} />
                    <YAxis 
                    domain={[0, (dataMax) => Math.max(dataMax, dailyGoal)]}
                    tickFormatter={(value) => `${value} l`}
                    />
                    <Tooltip  formatter={(value) => `${value} l`}/>
                    <Legend />
                    <Line type="monotone" dataKey="waterIntake" stroke="#87D28D" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaterStatistics;