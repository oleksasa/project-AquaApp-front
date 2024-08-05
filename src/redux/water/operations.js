import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createWater,
  updateWater,
  deleteWater,
  getDayWater,
  getMonthWater,
} from "../../api/water.js";

export const dateToUTC = (ms) => {
  const dateObject = new Date(Number(ms));
  return new Date(
    Date.UTC(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      dateObject.getHours(),
      dateObject.getMinutes()
    )
  );
};

export const dateToLocal = (ms) => {
  const dateObject = Number(ms);
  const timezoneOffset = new Date().getTimezoneOffset() * 60000; // смещение в миллисекундах
  const localDateWithTimezone = dateObject + timezoneOffset;
  return localDateWithTimezone.toString();
};
//===================== ADD WATER =====================

export const addWater = createAsyncThunk(
  "water/addWater",
  async (formData, thunkAPI) => {
    try {
      formData.date = String(dateToUTC(formData.date).getTime());
      const response = await createWater(formData);
      response.data.data.date = dateToLocal(response.data.data.date);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== UPDATE WATER ====================

export const updateWaterIntakeRecord = createAsyncThunk(
  "water/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      if (formData.date) {
        formData.date = String(dateToUTC(formData.date).getTime());
      }
      const { data } = await updateWater(id, formData);
      data.data.date = dateToLocal(data.data.date);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== DELETE WATER ====================

export const deleteWaterIntakeRecord = createAsyncThunk(
  "water/deleteWater",
  async (id, thunkAPI) => {
    try {
      const { data } = await deleteWater(id);
      data.data.date = dateToLocal(data.data.date);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//================= GET MONTHLY WATER =================

export const fetchMonthlyWater = createAsyncThunk(
  "water/fetchWaters",
  async (formData, thunkAPI) => {
    try {
      const dateUTC = String(dateToUTC(formData).getTime());
      const { data } = await getMonthWater(dateUTC);
      data.data = data.data.map((item) => ({
        ...item,
        date: dateToLocal(item.date),
      }));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//================== GET DAILY WATER ==================

export const fetchDailyWater = createAsyncThunk(
  "water/fetchDay",
  async (date, thunkAPI) => {
    try {
      const dateUTC = String(dateToUTC(date).getTime());
      const response = await getDayWater(dateUTC);
      response.data = response.data.map((item) => ({
        ...item,
        date: dateToLocal(item.date),
      }));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchTodayWater = createAsyncThunk(
  "water/today",
  async (_, thunkAPI) => {
    try {
      const dateUTC = String(dateToUTC(new Date().getTime()).getTime());
      const response = await getDayWater(dateUTC);
      return response.dailyAmount;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
//================= GET WEEKLY WATER =================

// export const fetchWeeklyWater = createAsyncThunk(
//   "water/fetchWeek",
//   async (formattedDate, thunkAPI) => {
//     try {
//       const dateUTC = String(dateToUTC(formattedDate).getTime());
//       const { data } = await getWeekWater(dateUTC);
//       data.data = data.data.map((item) => ({
//         ...item,
//         date: dateToLocal(item.date),
//       }));
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   }
// );
