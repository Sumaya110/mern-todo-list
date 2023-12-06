import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupAsync } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);


    try {
      await dispatch(signupAsync({email, password}));
      setIsLoading(false);
      navigate('/user/login', { replace: true });

    } catch (error) {
      setIsLoading(false);
      setError( 'Failed to signup!!');
      console.log(error)
    }

    // console.log("error for signup :  ", error)
  };

  return { signup, isLoading, error };
};
