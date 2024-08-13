import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import {
  selectChoosingDay,
  selectIsTodayDay,
} from '../../redux/water/selectors';
import { getShowDate } from '../../helpers/dateRequire';

export default function ChooseDate() {
  const choosingDay = useSelector(selectChoosingDay);
  const isToday = useSelector(selectIsTodayDay);

  console.log('today', isToday);
  const day = getShowDate(choosingDay);
  console.log('day', day);

  return <p className={css.text}>{isToday ? 'Today' : day}</p>;
}
