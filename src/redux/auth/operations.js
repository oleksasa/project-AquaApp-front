import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  logInUser,
  logOutUser,
  registerUser,
  requestUserInfo,
  updateUserInfo,
} from "../../api/auth.js";
import { fetchRefreshToken } from "../../axios.js";

//====================== SIGN IN ======================

export const logIn = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await logInUser(userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  }
);

//====================== SIGN UP ======================

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, thunkAPI) => {
    try {
      const resSignUp = await registerUser(userData);
      return resSignUp.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  }
);

//====================== LOG OUT =======================

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logOutUser();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//================= USER INFORMATION ===================

export const getUserInfo = createAsyncThunk(
  "auth/info",
  async (_, thunkAPI) => {
    try {
      const response = await requestUserInfo();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  }
);

//================== UPDATE PROFILE ====================

export const updateUserProfile = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUserInfo(userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.data.message);
    }
  }
);

//=================== UPLOAD PHOTO =====================

// export const uploadUserPhoto = createAsyncThunk(
//   "users/photo",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await updateUserPhoto(formData);
//       return response.data.photo;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.data.message);
//     }
//   }
// );

//=================== REFRESH TOKEN =====================

export const refreshToken = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    try {
      const { token } = await fetchRefreshToken();
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

//=====================================================

//export const googleLogIn = createAsyncThunk();

//=====================================================

//TODO: export const forgetPassword = createAsyncThunk();

//=====================================================

//TODO: export const resetPassword = createAsyncThunk();
