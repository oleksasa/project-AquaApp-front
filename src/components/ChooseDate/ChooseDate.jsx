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

  const day = getShowDate(choosingDay);

  return <p className={css.text}>{isToday ? 'Today' : day}</p>;
}
