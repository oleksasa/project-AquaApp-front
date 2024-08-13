import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isAfter } from 'date-fns';
import css from './WaterStatistics.module.css';
import { selectWaterRateInMilliliters } from '../../redux/auth/selectors.js';

const WaterStatistics = ({ currentMonth, waterData }) => {

    const dailyGoalInMilliliters = useSelector(selectWaterRateInMilliliters);

    const dailyGoal = dailyGoalInMilliliters / 1000;

    const getMonthData = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const today = new Date();

        if (isAfter(start, today)) {
            return [];
        }

        const lastDay = isAfter(today, end) ? end : today; 
        const days = eachDayOfInterval({ start, end: lastDay });

        
        return days.map(day => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const percentage = waterData.find(data => data.date === formattedDate)?.percentage || "0";
            const waterIntake = (parseFloat(percentage) / 100) * dailyGoal;
            return {
                date: format(day, 'd'),
                waterIntake: waterIntake
            };
        });
    };

    const monthData = getMonthData();

    const CustomActiveDot = (props) => {
        const { cx, cy, stroke, fill, value } = props;
        return (
            <svg x={cx - 9} y={cy - 9} width={18} height={18} viewBox="0 0 18 18">
                <circle cx={9} cy={9} r={6} fill={fill} stroke={stroke} strokeWidth={3} value={value}/>
            </svg>
        );
    };

    return (
        <div className={css.container}>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={monthData}
                    margin={{ top: 50, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorWaterIntake" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="date"
                    interval={0} 
                    tickFormatter={(value) => `${value}`} 
                    />
                    <YAxis 
                    domain={[0, dailyGoal]}
                    tickFormatter={(value) => `${value.toFixed(1)} l`}
                    />
                    <Tooltip  formatter={(value) => `${value.toFixed(1)} l`}/>
                    <Legend />
                    <Area type="monotone" dataKey="waterIntake" fillOpacity={1} 
                    fill="url(#colorWaterIntake)" stroke="#87D28D" strokeWidth={3} 
                    activeDot={<CustomActiveDot fill="#FFFFFF" stroke="#87D28D"/>}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaterStatistics;