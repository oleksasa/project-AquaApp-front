import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isAfter } from 'date-fns';
import css from './WaterStatistics.module.css';

const WaterStatistics = ({ currentMonth, waterData }) => {
    // Функція для отримання даних за місяцем до поточної дати
    const getMonthData = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const today = new Date();

        if (isAfter(start, today)) {
            return [];
        }

        const lastDay = isAfter(today, end) ? end : today; // Визначаємо останній день для графіка
        const days = eachDayOfInterval({ start, end: lastDay });

        // Створення масиву даних для графіка
        return days.map(day => {
            const formattedDate = format(day, 'dd-MM-yyyy');
            return {
                date: format(day, 'd'),
                waterIntake: waterData[formattedDate]?.dailyWaterIntake || 0
            };
        });
    };
    // дані для прикладу
    const dailyGoal = 2;

    const monthData = getMonthData();

    return (
        <div className={css.container}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={monthData}
                    margin={{ top: 50, right: 10, left: 0, bottom: 0 }}
                >
                    {/* <defs>
                        <linearGradient id="colorWaterIntake" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9BE1A0" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
                        </linearGradient>
                    </defs> */}
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
                    <Line type="monotone" dataKey="waterIntake" stroke="#9BE1A0" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaterStatistics;