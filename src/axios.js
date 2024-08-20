import axios from 'axios';
import { logOutReducer, setToken } from './redux/auth/slice.js';

const BASE_URL = 'https://project-aquaapp-back-new-reborn.onrender.com/';

let store;
export const injectStore = _store => {
  store = _store;
};

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchRefreshToken = async () => {
  const { data } = await axios.post(
    `${BASE_URL}` + '/auth/refresh',
    {},
    { withCredentials: true },
  );
  return data.data.accessToken;
};

instance.interceptors.request.use(
  config => {
    const state = store.getState();
    const { token } = state.auth;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await fetchRefreshToken();
        store.dispatch(setToken(token));
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return instance(originalRequest);
      } catch (error) {
        if (error.response.status === 401) {
          store.dispatch(logOutReducer());
        }
      }
    }
    return Promise.reject(error);
  },
);
