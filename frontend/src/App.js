import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/error';
import Navbar from './layouts/Navbar';
import { initializeUserAsync } from './features/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Fix import statement

import './App.css';

import TasksView from './features/tasks/TasksView';
import AddTask from './features/tasks/AddTask';
import EditTask from './features/tasks/EditTask';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Navigate } from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.authReducer.user);
  console.log(user);

  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the initializeUserAsync action during component initialization
    dispatch(initializeUserAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="user/login" />}
          />

          <Route path="/show-tasks" element={<TasksView />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task" element={<EditTask />} />
          <Route path="*" element={<Error />} />

          <Route
            path="/user/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route path="/user/signup" element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
