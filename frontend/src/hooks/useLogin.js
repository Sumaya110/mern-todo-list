// import { useState } from 'react'
// import { useDispatch } from 'react-redux';
// // import { useAuthContext } from './useAuthContext'
// import { loginAsync } from '../features/auth/authSlice'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   // const { dispatch } = useAuthContext()
//   const dispatch = useDispatch();

//   const login = async (email, password) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//         await dispatch(loginAsync({email, password}));
//         setIsLoading(false);
  
//       } catch (error) {
//         setIsLoading(false);
//         setError( 'Failed to login');
//       }
//   }

//   return { login, isLoading, error }
// }


import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../features/auth/authSlice';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Dispatch the asynchronous login thunk
      await dispatch(loginAsync({ email, password }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to login');
    }
  };

  return { login, isLoading, error };
};
