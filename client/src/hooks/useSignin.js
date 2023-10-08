import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const { dispatch } = useAuthContext();

  const signin = async (identifier, password) => {
    setIsLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/api/user/signin', {identifier, password});

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: 'LOGIN', payload: response.data });
        setIsLoading(false);

        console.log('Signin successfully:', response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);

      console.error('Signin failed:', error.response.data.error);
    }
  };

  return { signin, error, isLoading }; 
};
