import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupAsync } from '../features/auth/authSlice';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);


    try {
      await dispatch(signupAsync({email, password}));
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setError( 'Failed to signup');
      // console.log(error)
    }
  };

  return { signup, isLoading, error };
};
