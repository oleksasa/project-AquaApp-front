import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  fetchDailyWater,
  fetchMonthlyWater,
  updateWater,
} from './operations';

import { WATER_INITIAL_STATE } from './initialState';

const waterSlice = createSlice({
  name: 'water',
  initialState: WATER_INITIAL_STATE,
  reducers: {
    isTodayDayChoosing(state, action) {
      state.isTodayDay = action.payload;
    },
    choosingDay(state, action) {
      state.choosingDay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //=================== fetchDailyWater ===================
      .addCase(fetchDailyWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDailyWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //======================= addWater ======================
      .addCase(addWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.data.dayItems.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //====================== updateWater ======================
      .addCase(updateWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.dayItems.map(item =>
          item._id === action.payload._id ? (item = action.payload) : item,
        );
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //===================== deleteWater =====================
      .addCase(deleteWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.dayItems.findIndex(
          item => item._id === action.payload._id,
        );
        state.data.dayItems.splice(index, 1);
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // ================== fetchMonthlyWater ==================
      .addCase(fetchMonthlyWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataPerMonth = action.payload.data.dataPerMonth;
      })
      .addCase(fetchMonthlyWater.rejected, state => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.isError = true;
      });
  },
});

export const { isTodayDayChoosing, choosingDay } = waterSlice.actions;

export default waterSlice.reducer;
