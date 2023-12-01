import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask } from './TaskSlice';

import { useSelector } from 'react-redux';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [error, setError] =useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector((state)=>state.authReducer.user)
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user)
    {
      setError('You must be logged in!!')
      return 

    }

    console.log("useeeeeer :", user)


    const task = { title };
    dispatch(addTask(task, user))
      .then(() => {
        navigate('/show-tasks', { replace: true });
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title"> Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AddTask;
