import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialAuthState = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
    loadingComplete: (state) => {
      state.loading = false;
    },
  },
});


// export const { login, logout } = authSlice.actions;
export const { login, logout, loadingComplete } = authSlice.actions;
// Asynchronous action creator using Redux Thunk and Axios

export const initializeUserAsync = () => async (dispatch) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(login(storedUser));
    }
    dispatch(loadingComplete());
  } catch (error) {
    console.error('Error initializing user:', error);
    dispatch(loadingComplete());
  }
};


export const loginAsync = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/user/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const user = response.data;
      dispatch(login(user));

      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loadingComplete()); // Dispatch loading complete action
    } else {
      console.error('Error logging in:', response.statusText);
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Thunk for user signup
export const signupAsync = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post('/api/user/signup', { email, password });

    if (response.status === 200) {
      const user = response.data;
      dispatch(login(user));
      dispatch(loadingComplete()); // Dispatch loading complete action
    } else {
      const errorMessage = response.data.message || 'Failed to signup';
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error(error.message || 'Failed to signup');
  }
};

// Asynchronous action creator for logout
export const logoutAsync = () => async (dispatch) => {
  try {
    localStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default authSlice.reducer;

