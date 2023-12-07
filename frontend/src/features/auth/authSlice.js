import { createSlice } from '@reduxjs/toolkit';
import { apiLogin, apiSignup } from '../api/apiRoute';


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


// Thunk for user signup
export const signupAsync = ({ email, password }) => async (dispatch) => {
  try {

    const response = await apiSignup({email, password});

    if (response.status === 200) {
      const user = response.data;
       dispatch(login(user));
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loadingComplete()); 
    } else {
      const errorMessage = response.data.message || 'Failed to signup';
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error(error.message || 'Failed to signup');
  }
};


// Thunk for user login
export const loginAsync = (userData) => async (dispatch) => {
  
  try {

     const response = await apiLogin(userData);

    console.log("response status : ", response.status)
    if (response.status === 200) {
      const user = response.data;
      dispatch(login(user));

      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loadingComplete()); // Dispatch loading complete action
      
    } else {
  
      const errorMessage = response.data.message || 'Failed to login';
      throw new Error(errorMessage);
    }
  } catch (error) {
   
    console.error('Error during signup:', error);
    throw new Error(error.message || 'Failed to login');
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

