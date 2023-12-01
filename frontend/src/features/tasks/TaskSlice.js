import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialTasks = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasks,
  reducers: {
    showTasksSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    addTaskSuccess: (state, action) => {
      //state.tasks.push(action.payload);
      state.tasks = [action.payload,...state.tasks];
      //console.log("add task recuer: ",state.tasks, action.payload)
    },
    updateTaskSuccess: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task._id === updatedTask._id);

      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTaskSuccess: (state, action) => {
      const deletedTask = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== deletedTask._id);
    },
  },
});

export const {
  showTasksSuccess,
  addTaskSuccess,
  deleteTaskSuccess,
  updateTaskSuccess,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// Asynchronous action creators using Redux Thunk
export const fetchTasks = (user) => async (dispatch) => {
  console.log(user)
  try {
    const response = await axios.get('/api/tasks', {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    console.log("fect task: ", {response});
    dispatch(showTasksSuccess(response.data));
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const addTask = (taskData, user) => async (dispatch) => {
  try {

    console.log("user :::", taskData)
    if (!user) {
      console.error('User or token is undefined!!');
      return;
    }

    const response = await axios.post('/api/tasks', taskData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    console.log("addTask function: ", {response})

    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = (taskData, user) => async (dispatch) => {
  console.log("update task: ", taskData)
  try {
    const response = await axios.patch(`/api/tasks/${taskData._id}`, taskData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });

    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = (taskData, user) => async (dispatch) => {
  if(!user)
    {
      return
    }
  try {
    const response = await axios.delete(`/api/tasks/${taskData._id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
  
    });
    
    dispatch(deleteTaskSuccess(response.data));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
