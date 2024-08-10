import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  return isLoggedIn || token ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
