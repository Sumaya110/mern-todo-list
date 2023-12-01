
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/TaskSlice';
import authReducer, { loginAsync } from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    tasksReducer: tasksReducer,
    authReducer: authReducer,
  },
});

export { loginAsync }; // export the thunk for usage in components
export default store;
