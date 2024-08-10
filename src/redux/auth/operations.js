import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  logInUser,
  logOutUser,
  registerUser,
  requestUserInfo,
  updateUserInfo,
} from '../../api/auth.js';
import { fetchRefreshToken } from '../../axios.js';

//====================== SIGN IN ======================

export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const res = await logInUser(userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  },
);

//export const login = createAsyncThunk(
//   'auth/login',
//   async ({ formData, formik }, thunkAPI) => {
//     try {
//       const { data } = await apiLogin(formData);
//       setToken(data.token);
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     } finally {
//       formik.resetForm();
//     }
//   },
// );

//====================== SIGN UP ======================

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, thunkAPI) => {
    try {
      const resSignUp = await registerUser(userData);
      return resSignUp.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

//====================== LOG OUT =======================

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logOutUser();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//================= USER INFORMATION ===================

export const getUserInfo = createAsyncThunk(
  'auth/info',
  async (_, thunkAPI) => {
    try {
      const response = await requestUserInfo();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  },
);

//================== UPDATE PROFILE ====================

export const updateUserProfile = createAsyncThunk(
  'auth/update',
  async (userData, thunkAPI) => {
    try {
      const response = await updateUserInfo(userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  },
);

//=================== REFRESH TOKEN =====================

export const refreshToken = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    try {
      return fetchRefreshToken();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Unable to refresh token';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

//=====================================================

//export const googleLogIn = createAsyncThunk();

//=====================================================

//TODO: export const forgetPassword = createAsyncThunk();

//=====================================================

//TODO: export const resetPassword = createAsyncThunk();

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { clearToken, setToken } from '../../api/instance';
// import {
//   apiLogOut,
//   apiLogin,
//   apiRefreshUser,
//   apiRegister,
// } from '../../api/authorisation';

// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     await apiLogOut();
//     clearToken();
//     return;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
//   const state = thunkAPI.getState();
//   const persistedToken = state.auth.token;

//   if (!persistedToken) return thunkAPI.rejectWithValue('Unable to fetch user');

//   try {
//     setToken(persistedToken);
//     const { data } = await apiRefreshUser();
//     return data;
//   } catch (e) {
//     return thunkAPI.rejectWithValue(e.message);
//   }
// });

// export const refreshThunk = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth.token;
//       setToken(token);
//       const { data } = await instance.get('/users/current');

//       return data;
//     } catch (err) {
//       return thunkApi.rejectWithValue(err.message);
//     }
//   },
//   {
//     condition: (_, thunkApi) => {
//       const state = thunkApi.getState();
//       const token = state.auth.token;
//       if (!token) return false;
//       return true;
//     },
//   },
// );
