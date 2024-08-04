export const WATER_INITIAL_STATE = {
  waterMonthly: {
    data: [],
    isLoading: false,
    isError: null,
  },
  waterDaily: {
    data: [],
    amount: 0,
    percentage: 0,
    isLoading: false,
    isError: null,
    errorMessage: null,
    successMessage: null,
  },
  todayAmount: {
    value: 0,
    isLoading: false,
    isError: null,
  },
  waterWeekly: {
    data: [],
    isLoading: false,
    errorMessage: null,
  },
};
