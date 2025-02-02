export const INITIAL_STATE = {
  user: {
    name: '',
    email: null,
    gender: null,
    avatar: null,
    weight: 0,
    dailyActiveTime: 0,
    dailyWaterConsumption: 0,
  },
  isLoading: null,
  isLoadingPhoto: null,
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
  isNewUser: false,
  errorMessage: null,
  successMessage: null,
};
