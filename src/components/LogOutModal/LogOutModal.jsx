import { useDispatch, useSelector } from 'react-redux';
import css from './LogOutModal.module.css';
import { logOut } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';

const LogOutModal = ({onRequestClose}) => {
  const dispatch=useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logOutUser=()=>{
    dispatch(logOut());

    if(isLoggedIn){
      toast.error("Something went wrong. Try again later")
    }
  }

  return (
    <div className={css.container}>
      <h2 className={css.h2}>Log out</h2>
      <p className={css.p}>Do you really want to leave?</p>
      <div className={css.containerBtn}>
        <button type='button' className={css.delete} onClick={logOutUser}>
          Log out
        </button>
        <button type='button' className={css.cancel} onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
