import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAsync } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showTasksSuccess } from '../features/tasks/TaskSlice'


const Navbar = () => {

  const navigate=useNavigate()
 
  const user = useSelector((state)=>state.authReducer.user)
  console.log(user)


  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    if(user){
      localStorage.removeItem('user')
    }
    dispatch(logoutAsync());
    dispatch(showTasksSuccess(null))
    navigate('/user/login', { replace: true });
  };
  

  return (
   <nav>

    {user && (
      <div>
        {/* <span> {user.email} </span> */}
       
        <Link  to="/" className='nav-link'> 
             Home 
        </Link>

        <Link to="/show-tasks" className='nav-link'>
            Show Tasks
        </Link>

        <Link to="/add-task" className='nav-link'>
            Add Tasks
        </Link>
        <button onClick={handleLogoutClick}>Log out</button>
      </div>
    )}

  
      {/* console.log("loading", loading) */}
    {!user && (
      <div>
            <Link to="/user/login" className='nav-link'>Login</Link>
            <Link to="/user/signup" className='nav-link'>Signup</Link>
      </div>
    )}

   </nav>

  )
}

export default Navbar;
