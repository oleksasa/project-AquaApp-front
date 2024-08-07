import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectToken } from '../../redux/auth/selectors';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return token || isAuthenticated ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

// import { selectIsLoggedIn } from './redux/auth/selectors';

// export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? Component : <Navigate to={redirectTo} />;
// };
