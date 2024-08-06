import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import RestrictedRoute from './components/permissions/RestrictedRoute';
import PrivateRoute from './components/permissions/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
// const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
//const NotFoundPage = lazy(() =>
// import("../pages/NotFoundPage/NotFoundPage.jsx"));

function App() {
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </SharedLayout>
  );
}

export default App;
