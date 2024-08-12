import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './initialState';
import {
  getUserInfo,
  logIn,
  logOut,
  refreshToken,
  signUp,
  updateUserProfile,
} from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOutReducer: () => {
      return INITIAL_STATE;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setNewUser: (state, action) => {
      state.isNewUser = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      ////////////////////////////////////////////////////
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.token = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isNewUser = true;
        state.successMessage = 'Successfully registered';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.successMessage = 'Successfully logged in';
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(logOut.fulfilled, state => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, state => {
        return INITIAL_STATE;
      })

      ////////////////////////////////////////////////////
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = 'Something went wrong, try again later';
      })

      ////////////////////////////////////////////////////
      .addCase(updateUserProfile.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Profile updated';
        state.user = {
          ...state.user,
          ...action.payload.data.user,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = 'Something went wrong, try again later';
      })

      //////
      .addCase(refreshToken.pending, state => {
        state.isLoggedIn = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, () => INITIAL_STATE);
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn, setNewUser, setUser } =
  authSlice.actions;
