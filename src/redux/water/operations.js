import { createAsyncThunk } from '@reduxjs/toolkit';

import toast from 'react-hot-toast';
import {
  clearWater,
  createWater,
  getDayWater,
  getMonthWater,
  patchWater,
} from '../../api/water';

export const fetchDailyWater = createAsyncThunk(
  'water/fetchWaterPerDay',
  async (date, thunkAPI) => {
    try {
      const response = await getDayWater(date);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// "2024-08-09"
export const addWater = createAsyncThunk(
  'water/addWater',
  async (newWater, thunkAPI) => {
    try {
      const response = await createWater(newWater);
      toast.success('Successfully added water!');
      return response.data;
    } catch (error) {
      toast.error('Something went wrong, try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// {
//   date: "2024-07-24T10:12:22Z",
//   volume: 50
// }

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async (water, thunkAPI) => {
    try {
      const response = await patchWater(water._id, {
        date: water.date,
        volume: water.volume,
      });
      toast.success('Successfully updated water!');
      return response.data;
    } catch (error) {
      toast.error('Something went wrong, try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// {
//   _id: "777777777777"
//   date: "2024-07-24T10:12:22Z",
//   volume: 50
// }

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (waterId, thunkAPI) => {
    try {
      const response = await clearWater(waterId);
      toast.success('Successfully deleted water!');
      return response.data;
    } catch (error) {
      toast.error('Something went wrong, try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
//  "777777777777"

export const fetchMonthlyWater = createAsyncThunk(
  'water/fetchMonthlyWater',
  async (date, thunkAPI) => {
    try {
      const response = await getMonthWater(date);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
// "2024-08"
