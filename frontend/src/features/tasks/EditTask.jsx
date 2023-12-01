import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateTask } from './TaskSlice';


const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState(location.state.title);
  const [_id, setId] = useState(location.state._id);
  const user = useSelector((state)=> state.authReducer.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, _id };

    dispatch(updateTask(task, user))
      .then(() => {
        navigate('/show-tasks', { replace: true });
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div>
      <h1>Edit Task</h1>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
