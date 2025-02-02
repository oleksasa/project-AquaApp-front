export const selectWater = state => state.water.data.dayItems;
export const selectTotalWaterPerDay = state => state.water.data.totalPerDay;
export const selectPercentPerDay = state => state.water.data.percentPerDay;
export const selectTotalWaterPerMonth = state => state.water.dataPerMonth.data;
export const selectIsTodayDay = state => state.water.isTodayDay;
export const selectChoosingDay = state => state.water.choosingDay;
export const selectLoading = state => state.water.loading;
export const selectError = state => state.water.error;
