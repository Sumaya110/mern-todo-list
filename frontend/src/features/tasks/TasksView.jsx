import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from './TaskSlice';

const TasksView = () => {

  

  const tasks = useSelector((state) => state.tasksReducer.tasks);
  
  const dispatch = useDispatch();

  const user = useSelector((state)=>state.authReducer.user)
  console.log(user)

  useEffect(() => {
    // Dispatch the asynchronous action creator to fetch tasks
    if(user)
    {
       dispatch(fetchTasks(user));

    }
    
  }, [dispatch ,user]);

  const handleClick = async (task) => {

    
    // Dispatch the asynchronous action creator to delete the task
    dispatch(deleteTask(task, user))
    
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };
  console.log({tasks});

  return (
    <div>
      <h2>List of Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => {
              const { title, _id } = task;
              return (
                <tr key={_id}>
                  <td>{title}</td>
                  <td>
                    <Link to="/edit-task" state={task}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleClick(task)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TasksView;
