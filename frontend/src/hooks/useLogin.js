import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null)

    try {
       await dispatch(loginAsync({ email, password }));
       setIsLoading(false);
      //  navigate('/show-tasks', { replace: true });
    } catch (error) {
      setIsLoading(false);
      setError('Failed to login!!');
      console.log(error)
    }

  };

  return { login, isLoading, error };
};
